# Pixel calculations for Slide 3 & Slide 4

# Slide 3 (Services)
sheet_h = 1000
header_h = 85
footer_h = 52
content_pad = 48 # 24px top + 24px bottom
avail_h = sheet_h - header_h - footer_h - content_pad # 815px

lead_h = 60 # lead box
ribbon_h = 42 # bottom ribbon
gap_h = 16 * 2 # margins
cards_avail = avail_h - lead_h - ribbon_h - gap_h # 815 - 60 - 42 - 32 = 681px

print("Slide 3 available for cards:", cards_avail)
# If card is 650px:
# Image: 230px
# Floating icon: overlaps by 22px
# Title: 24px
# Desc: 50px
# 4 Bullets: 4 * 24px = 96px
# Metric badge / ROI: 36px
# Tech pills: 30px
# Padding: 36px
# Total content: 230 + 24 + 50 + 96 + 36 + 30 + 36 = 502px!

# Slide 4 (Campus ERP)
compliance_bar_h = 56
cards_avail_s4 = avail_h - compliance_bar_h - 16 # 815 - 56 - 16 = 743px
row_h_s4 = (cards_avail_s4 - 14) / 2 # (743 - 14) / 2 = 364.5px
print("Slide 4 each row height:", row_h_s4)

# In Slide 4 card (height: 364px):
# Header: 36px
# Image: 175px
# Bullets (3 items): 3 * 25px = 75px
# Padding: 24px
# Gaps: 8px * 3 = 24px
# Total: 36 + 175 + 75 + 24 + 24 = 334px! Fits 364px with ZERO blank space!

