# Orynth Product Submit — recorded flow

URL: https://www.orynth.dev/projects/submit
Account: devorynth@gmail.com (Google)

## Steps (1–13)

1. Click **Product** card (Apps, tools, SaaS…)
2. **Product name** → `#name` (max 40) → **Next**
3. **One line pitch** → `#tagline` (max 60) → **Next**
4. **Where can people try it** → `#websiteUrl` → **Next**
5. **What makes it special** → TipTap → **Next**
6. **Logo** → upload SVG/PNG → **Next**
7. **Screenshots** → multi upload → **Next**
8. **Categories** → exactly 3 `#cat-*` → **Next**
9. → **Next** (no Autodev fill)
10. → **Next** (no Autodev fill)
11. **First comment** → TipTap ("Why did you build this?") → **Next**
12. → **Next**
13. **Submit** — terminal asks `Ready to submit?` then clicks Submit

Automation: `src/orynth-submit.ts` (Playwright). Logo SVG → PNG via
`setInputFiles`. Enter on the prompt submits; anything else aborts.

## This ship

```json
{
  "productName": "PlantDoctor",
  "oneLinePitch": "Diagnose your plant's ailments with a photo",
  "websiteUrl": "https://plantdoctor.vercel.app",
  "whatMakesItSpecial": "PlantDoctor uses AI-powered image recognition to instantly diagnose plant health issues from a single photo. Unlike generic plant care apps, it provides personalized treatment plans specific to your plant's actual symptoms, not just species. The built-in watering schedule adapts to your diagnosed plant's current condition, helping you nurse it back to health with actionable, step-by-step care instructions.",
  "logoAbsolutePath": "C:\\Users\\noahw\\Downloads\\CodingProjects\\OrynthAutoDev\\projects\\plantdoctor\\listing\\logo.svg",
  "screenshotAbsolutePaths": [
    "C:\\Users\\noahw\\Downloads\\CodingProjects\\OrynthAutoDev\\projects\\plantdoctor\\listing\\screenshots\\01-home.png",
    "C:\\Users\\noahw\\Downloads\\CodingProjects\\OrynthAutoDev\\projects\\plantdoctor\\listing\\screenshots\\02-diagnose.png"
  ],
  "categories": [
    "Artificial Intelligence",
    "Mobile Development",
    "Machine Learning"
  ],
  "categoryIds": [
    "cat-ai",
    "cat-mobile-dev",
    "cat-machine-learning"
  ],
  "firstComment": "Hey Product Hunt! 👋 I built PlantDoctor after killing my third succulent in a row and realizing I had no idea what I was doing wrong. I wanted something that could look at my sad, drooping plants and tell me exactly what they needed—not just generic care guides. Just snap a photo and you'll get a diagnosis plus specific instructions to help your plant recover. I'd love to hear what you think, especially if you've got plant horror stories of your own! What features would make this more useful for you?"
}
```
