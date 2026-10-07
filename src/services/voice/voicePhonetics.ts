/**
 * Acoustic Phonetics & Speech Normalizer for Stalight Assistant
 * Accurately maps all speech recognition artifacts, misrecognitions, and dialect variants
 * (e.g., "the light campus", "starlight", "stay light", "straight light", "light erp") to "Stalight".
 */

export function normalizeStalightPhonetics(text: string): string {
  if (!text) return '';

  let normalized = text;

  // 1. Phrasal matches with product keywords (e.g. "open the light campus", "what is the light campus")
  normalized = normalized
    .replace(
      /\b(open|show|view|tell me about|what is|how is|go to|take me to|navigate to)\s+(the\s+)?light\s+(campus|sync|erp|platform|tech|technologies|system|website|portal)\b/gi,
      '$1 Stalight $3'
    )
    .replace(
      /\b(the|a|to|for|that|our)\s+light\s+(campus|sync|erp|tech|technology|technologies|access|plans|pricing|features|demo|attendance|lms)\b/gi,
      'Stalight $2'
    )
    .replace(
      /\b(campus|sync|erp)\s+light\b/gi,
      'Stalight $1'
    );

  // 2. Direct acoustic misrecognitions of the brand name "Stalight"
  normalized = normalized.replace(
    /\b(starlight|star\s*light|star\s*lite|stahlight|stah\s*light|stah\s*lite|staylight|stay\s*light|stay\s*lite|stallight|stall\s*light|startlight|start\s*light|sta\s*light|st\.\s*light|st\s*light|delight|daylight|day\s*light|skylight|sky\s*light|satellite|sat\s*light|sad\s*light|stelid|stalid|staled|stellite|straight\s*light|stalite|staight|starlite|starlet|starr\s*light)\b/gi,
    'Stalight'
  );

  // 3. Standalone product-qualified "light" words
  normalized = normalized
    .replace(/\blight\s+(campus|sync|erp|lms|fees|timetable|attendance|placement|training|developer|services)\b/gi, 'Stalight $1')
    .replace(/\b(open|show|view|explore)\s+the\s+light\b/gi, '$1 Stalight')
    .replace(/\b(bouquet|bucket|booker|bookers|book a|book for|book the|book)\s+(a\s+)?demo\b/gi, 'book a demo')
    .replace(/\bbooker\s*demo\b/gi, 'book a demo')
    .replace(/\bbouquet\b/gi, 'book a demo')
    .replace(/\s+/g, ' ')
    .trim();

  return normalized;
}

/**
 * Speech-to-Email Normalizer for Spoken Emails
 * Handles Indian English and general speech recognition variants for spoken emails:
 * - "at the rate", "at the right", "at the red", "at the rate of", "add the rate", "at" -> "@"
 * - "dot", "dott", "point", "period" -> "."
 * - Spoken digits: "one", "two", "three", etc.
 */
export function parseSpokenEmail(rawInput: string): string | undefined {
  if (!rawInput) return undefined;

  // Reject general queries that are clearly asking questions, unless explicitly prefixed by email
  const lower = rawInput.toLowerCase().trim();
  if (
    (lower.startsWith('what is') ||
      lower.startsWith('tell me about') ||
      lower.startsWith('how is') ||
      lower.startsWith('show me') ||
      lower.startsWith('who is')) &&
    !lower.includes('my email') &&
    !lower.includes('email is') &&
    !lower.includes('email address is')
  ) {
    return undefined;
  }

  // 1. Direct standard email regex match if already well-formed
  const directMatch = rawInput.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (directMatch) {
    const candidate = directMatch[0].toLowerCase();
    const user = candidate.split('@')[0];
    if (!['is', 'what', 'how', 'who', 'tell', 'show', 'the', 'this', 'that', 'about'].includes(user)) {
      return candidate;
    }
  }

  // 2. Strip conversational prefixes
  let text = rawInput
    .replace(/^(?:my\s+)?(?:email|mail|e-mail)(?:\s+address|\s+id)?\s*(?:is|as|=|:)?\s*/i, '')
    .replace(/^it(?:'s|\s+is)\s+/i, '')
    .trim();

  // 3. Convert spoken word numbers to digits in email username context
  const wordToDigit: Record<string, string> = {
    zero: '0',
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  };
  text = text.replace(/\b(zero|one|two|three|four|five|six|seven|eight|nine)\b/gi, (m) => wordToDigit[m.toLowerCase()] || m);

  // 4. Normalize spoken "dot" / "point" / "period"
  text = text
    .replace(/\s+(?:dot|dt|dott|point|period)\s+/gi, '.')
    .replace(/\s+(?:dot|dt|dott|point|period)([a-zA-Z]{2,})/gi, '.$1')
    .replace(/([a-zA-Z0-9])\s+(?:dot|dt|dott|point|period)/gi, '$1.');

  // 5. Normalize spoken "@" variants
  // Matches "at the right", "at the rate of", "at the rate", "at the red", "at the ret", "at the write", "add the rate", "at sign", "at"
  text = text
    .replace(/\s*(?:at\s+the\s+(?:rate\s+of|rate|right|red|ret|write)|add\s+the\s+rate|at\s+sign)\s*/gi, '@')
    .replace(/\s+at\s+(?=[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|gmail|yahoo|outlook|hotmail|icloud|live|proton|zoho|rediffmail|ac|edu|org|co|in|com)/gi, '@');

  const stopWords = new Set(['is', 'what', 'how', 'who', 'tell', 'show', 'the', 'this', 'that', 'about', 'our', 'your', 'and', 'with', 'for', 'to', 'in', 'on']);

  // 6. Handle user @ domain structure
  if (text.includes('@')) {
    const parts = text.split('@');
    if (parts.length >= 2) {
      const localPart = parts[0].trim().replace(/[^a-zA-Z0-9._%+-]/g, '');
      let domainPart = parts.slice(1).join('.').replace(/\s+/g, '').replace(/[^a-zA-Z0-9.-]/g, '');

      if (!localPart || stopWords.has(localPart.toLowerCase()) || localPart.length < 2) {
        return undefined;
      }

      // Autocomplete well-known providers without TLD (e.g. "ragu@gmail" -> "ragu@gmail.com")
      if (!domainPart.includes('.') && ['gmail', 'yahoo', 'outlook', 'hotmail', 'icloud', 'proton', 'zoho', 'rediffmail'].includes(domainPart.toLowerCase())) {
        domainPart = `${domainPart}.com`;
      }

      const candidate = `${localPart}@${domainPart}`.toLowerCase();
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(candidate)) {
        return candidate;
      }
    }
  }

  // 7. Handle provider phrases with explicit domain like "ragu gmail.com" or "ragu yahoo.com"
  const providerMatch = text.match(/([a-zA-Z0-9._%+-]{2,})\s*(?:@|\bat\b|\s)\s*(gmail|yahoo|outlook|hotmail|icloud|zoho|rediffmail)\.([a-zA-Z]{2,})/i);
  if (providerMatch) {
    const user = providerMatch[1].replace(/[^a-zA-Z0-9._%+-]/g, '');
    const provider = providerMatch[2].toLowerCase();
    const ext = providerMatch[3] || 'com';
    if (!stopWords.has(user.toLowerCase())) {
      const candidate = `${user}@${provider}.${ext}`.toLowerCase();
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(candidate)) {
        return candidate;
      }
    }
  }

  return undefined;
}

