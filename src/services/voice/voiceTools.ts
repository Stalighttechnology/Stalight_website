/**
 * Website Action Registry for Stalight Voice Assistant
 * Maps voice agent intents to real browser & DOM actions.
 */

import { NavigateFunction } from 'react-router-dom';

export interface ToolExecutionResult {
  success: boolean;
  message: string;
  actionPerformed?: string;
}

export class WebsiteActionRegistry {
  private navigateFn: NavigateFunction | null = null;

  public setNavigate(fn: NavigateFunction) {
    this.navigateFn = fn;
  }

  /**
   * Safe navigation across Stalight routes
   */
  public navigate(path: string, hash?: string): ToolExecutionResult {
    try {
      if (path.startsWith('http://') || path.startsWith('https://')) {
        const opened = window.open(path, '_blank');
        if (!opened || opened.closed || typeof opened.closed === 'undefined') {
          window.location.href = path;
        }
        return {
          success: true,
          message: `Redirected to ${path}`,
          actionPerformed: 'navigateExternal',
        };
      }

      if (this.navigateFn) {
        if (hash) {
          this.navigateFn(`${path}${hash.startsWith('#') ? hash : `#${hash}`}`);
        } else {
          this.navigateFn(path);
        }

        // Also ensure scroll to top when changing full pages without hash
        if (!hash) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        return {
          success: true,
          message: `Navigated to ${path}${hash || ''}`,
          actionPerformed: 'navigate',
        };
      } else {
        window.location.href = `${path}${hash || ''}`;
        return { success: true, message: `Redirecting to ${path}`, actionPerformed: 'navigate' };
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return { success: false, message: `Navigation failed: ${errorMsg}` };
    }
  }

  /**
   * Smoothly scroll to a section by element ID
   */
  public scrollToSection(sectionId: string): ToolExecutionResult {
    try {
      const cleanId = sectionId.replace(/^#/, '');
      const el = document.getElementById(cleanId) || document.querySelector(`[data-section="${cleanId}"]`);

      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.highlightElement(el);
        return {
          success: true,
          message: `Scrolled to section: ${cleanId}`,
          actionPerformed: 'scrollToSection',
        };
      }

      // If not on the current page, check if section belongs to home or another page
      if (['about', 'products', 'services', 'careers', 'contact', 'home'].includes(cleanId)) {
        this.navigate('/', `#${cleanId}`);
        return {
          success: true,
          message: `Navigating to home #${cleanId}`,
          actionPerformed: 'navigate',
        };
      }

      return {
        success: false,
        message: `Section #${cleanId} not found on the active page`,
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return { success: false, message: `Scroll failed: ${errorMsg}` };
    }
  }

  /**
   * Relative or absolute page scrolling
   */
  public scrollPage(direction: 'up' | 'down' | 'top' | 'bottom', amount = 450): ToolExecutionResult {
    try {
      if (direction === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (direction === 'bottom') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      } else if (direction === 'down') {
        window.scrollBy({ top: amount, behavior: 'smooth' });
      } else if (direction === 'up') {
        window.scrollBy({ top: -amount, behavior: 'smooth' });
      }
      return {
        success: true,
        message: `Scrolled ${direction}`,
        actionPerformed: 'scrollPage',
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return { success: false, message: `Scroll action failed: ${errorMsg}` };
    }
  }

  /**
   * Browser navigation controls
   */
  public goBack(): ToolExecutionResult {
    try {
      window.history.back();
      return { success: true, message: 'Navigated back', actionPerformed: 'goBack' };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return { success: false, message: `Go back failed: ${errorMsg}` };
    }
  }

  public goForward(): ToolExecutionResult {
    try {
      window.history.forward();
      return { success: true, message: 'Navigated forward', actionPerformed: 'goForward' };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return { success: false, message: `Go forward failed: ${errorMsg}` };
    }
  }

  /**
   * Interactive Demo Form Focus
   */
  public openDemoForm(): ToolExecutionResult {
    try {
      // Check if we are on NeuroCampus or home hero with demo form
      const formEl = document.getElementById('demo-form') || document.getElementById('hero-demo-form');

      if (!formEl) {
        // Navigate to Campus page where primary demo form is hosted
        this.navigate('/Stalight-Campus');
        setTimeout(() => {
          const deferredForm = document.getElementById('demo-form');
          if (deferredForm) {
            deferredForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
            this.highlightElement(deferredForm);
            const firstInput = deferredForm.querySelector('input');
            if (firstInput) firstInput.focus();
          }
        }, 600);
        return {
          success: true,
          message: 'Opening Stalight Campus demo booking form',
          actionPerformed: 'openDemoForm',
        };
      }

      formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.highlightElement(formEl);
      const input = formEl.querySelector('input');
      if (input) input.focus();

      return {
        success: true,
        message: 'Opened demo form',
        actionPerformed: 'openDemoForm',
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return { success: false, message: `Could not open demo form: ${errorMsg}` };
    }
  }

  /**
   * Interactive Contact / Demo Form Focus with route transition support
   */
  public openContactForm(): ToolExecutionResult {
    try {
      const scrollToForm = () => {
        const contactSec =
          document.getElementById('contact') ||
          document.getElementById('demo-form') ||
          document.querySelector('form');
        if (contactSec) {
          contactSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
          this.highlightElement(contactSec);
          const input = contactSec.querySelector('input');
          if (input) input.focus();
          return true;
        }
        return false;
      };

      if (scrollToForm()) {
        return { success: true, message: 'Focused contact section', actionPerformed: 'openContactForm' };
      }

      // Navigate to Home contact section
      this.navigate('/', '#contact');
      setTimeout(scrollToForm, 200);
      setTimeout(scrollToForm, 500);
      setTimeout(scrollToForm, 900);

      return { success: true, message: 'Navigating to contact section', actionPerformed: 'openContactForm' };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return { success: false, message: `Could not open contact: ${errorMsg}` };
    }
  }

  /**
   * Automatically populate form fields from voice input with full React controlled component support
   */
  public fillContactForm(fields: { name?: string; email?: string; message?: string }): ToolExecutionResult {
    try {
      this.openContactForm();

      const setReactValue = (element: HTMLInputElement | HTMLTextAreaElement, value: string) => {
        const isTextArea = element.tagName.toLowerCase() === 'textarea';
        const proto = isTextArea ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
        const descriptor = Object.getOwnPropertyDescriptor(proto, 'value');

        if (descriptor && descriptor.set) {
          descriptor.set.call(element, value);
        } else {
          element.value = value;
        }

        // Notify React value tracker
        const tracker = (element as unknown as { _valueTracker?: { setValue: (val: string) => void } })._valueTracker;
        if (tracker) {
          tracker.setValue(value);
        }

        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
      };

      // Search across contact section or any active form
      const root = document.getElementById('contact') || document;

      if (fields.name) {
        const nameInput = (root.querySelector('input[name="name"], input[placeholder*="name" i]') ||
          document.querySelector('input[name="name"]')) as HTMLInputElement;
        if (nameInput) setReactValue(nameInput, fields.name);
      }

      if (fields.email) {
        const emailInput = (root.querySelector('input[name="email"], input[type="email"]') ||
          document.querySelector('input[name="email"]')) as HTMLInputElement;
        if (emailInput) setReactValue(emailInput, fields.email);
      }

      if (fields.message) {
        const messageInput = (root.querySelector('textarea[name="message"], textarea[placeholder*="requirements" i], textarea') ||
          document.querySelector('textarea[name="message"]')) as HTMLTextAreaElement;
        if (messageInput) setReactValue(messageInput, fields.message);
      }

      return {
        success: true,
        message: 'Filled contact form fields',
        actionPerformed: 'fillContactForm',
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return { success: false, message: `Could not fill form: ${errorMsg}` };
    }
  }

  /**
   * Submit the contact / demo form
   */
  public submitContactForm(): ToolExecutionResult {
    try {
      const form = document.querySelector('form');
      if (!form) return { success: false, message: 'Form not found' };

      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      if (submitBtn) {
        submitBtn.click();
        return {
          success: true,
          message: 'Submitted form request',
          actionPerformed: 'submitContactForm',
        };
      }

      return { success: false, message: 'Submit button not found' };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return { success: false, message: `Could not submit form: ${errorMsg}` };
    }
  }

  /**
   * Visual feedback highlighting when an element is focused by the voice assistant
   */
  private highlightElement(el: Element) {
    el.classList.add('ring-4', 'ring-blue-500/50', 'transition-all', 'duration-500', 'rounded-2xl');
    setTimeout(() => {
      el.classList.remove('ring-4', 'ring-blue-500/50');
    }, 2400);
  }
}

export const actionRegistry = new WebsiteActionRegistry();
