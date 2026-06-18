# Donation survey (Food Bank USA study)

A 2x2 between-subjects survey: display mode (expanded vs control) x
appeal type (autonomous vs immediate aid), built from the study design
in `Interface_design_0616.docx`.

## What's in here

```
src/
  types.ts                 shared TypeScript types
  conditions.ts             random 2x2 condition assignment
  content.ts                 stimulus text + every questionnaire item
  utils.ts                   CSV export helper
  submitData.ts               <-- the function to edit for real data storage
  App.tsx                      controls which screen is showing
  components/
    ConsentScreen.tsx
    Stimulus.tsx               the Food Bank USA page (reveals lines for "expanded")
    DonationDecision.tsx       $2 bonus slider + donate confirmation
    LikertScale.tsx            reusable 1-7 question row
    MeasuresScreen.tsx         all the post-stimulus scales
    Demographics.tsx           gender + age
    ThankYou.tsx
```

Everything is plain React state (`useState`) - no Redux, no routing
library, no Tailwind. One step variable in `App.tsx` decides which
screen is on the page. If you want to change a question, you only
ever need to touch `content.ts` and possibly the matching component.

## Running it locally

You'll need [Node.js](https://nodejs.org) (the LTS version) installed
on your own machine - this part can't be done in this chat since it
needs your own internet connection to download packages.

```bash
cd donation-survey
npm install
npm run dev
```

This opens the survey at `http://localhost:5173`. Every save you make
to a file shows up in the browser instantly.

## Building for production

```bash
npm run build
```

This creates a `dist/` folder with the static files ready to host
anywhere.

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `donation-survey`) and push
   this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial survey"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/donation-survey.git
   git push -u origin main
   ```
2. Open `vite.config.ts` and make sure `base` matches your repo name
   exactly, e.g. `base: '/donation-survey/'`. If you named the repo
   something else, change this line first and push again.
3. On GitHub, go to **Settings -> Pages** and under "Build and
   deployment" set **Source** to **GitHub Actions**. The workflow in
   `.github/workflows/deploy.yml` (already included) will build and
   publish automatically on every push to `main`.
4. After the Actions tab shows a green checkmark, your survey is live
   at `https://YOUR_USERNAME.github.io/donation-survey/`.

That link is what you'd paste into Prolific.

## Saving real data (important before running a real study)

GitHub Pages only serves static files - it can't run a database or
receive form submissions on its own. Right now, `submitData.ts` just
downloads each participant's responses as a CSV file to their own
computer, which is fine for testing but won't work once real
participants are completing the survey, since you'd have no way to
collect those files.

The one function to change is `submitData` in `src/submitData.ts`.
Here are a few ways to make it actually save data, roughly easiest to
most flexible:

- **Google Sheets via Apps Script** (free, no separate hosting): in a
  Google Sheet, go to Extensions -> Apps Script, paste a small script
  that appends incoming POST data as a new row, deploy it as a "Web
  app", and `fetch()` that URL from `submitData`. This is the
  most common approach for student studies because everything stays
  in Google Sheets, which your advisor can view directly.
- **Formspree** (formspree.io): create a free form endpoint, POST your
  JSON to it, and submissions appear in their dashboard or get emailed
  to you. No code beyond the `fetch` call.
- **Firebase Firestore**: more setup, but gives you a real database
  and a free tier generous enough for most studies.

Whichever you pick, the rest of the app doesn't need to change - only
the inside of `submitData()`.

## Things to explore from here

A few directions, roughly in order of how much they'd teach you:

- **Attention checks.** The consent text mentions them but none exist
  yet. Add a "select strongly agree" item inside one of the measure
  blocks in `content.ts`, and flag responses that fail it.
- **Counterbalancing instead of pure randomization.** Right now each
  condition is assigned with independent coin flips, so cell sizes can
  end up uneven over many participants. Look into block randomization
  if even cell sizes matter for the analysis.
- **A progress indicator.** A simple `step` -> percentage mapping at
  the top of `App.tsx` would show participants how far along they are.
- **Validating Prolific IDs.** Prolific IDs are 24-character
  alphanumeric strings - you could add a regex check in
  `ConsentScreen.tsx` before letting people continue.
- **Exporting to long format.** Right now each submission is one wide
  CSV row. For analysis in R or Python, you may eventually want one
  row per question instead - that reshaping can happen either in
  `submitData.ts` before saving, or later in your analysis script.
- **Accessibility pass.** Try tabbing through the whole survey with
  only your keyboard, and check that every input has a clear focus
  state - small thing, but it matters for a real study.
- **Custom domain.** Once this is on GitHub Pages, you can point a
  custom domain at it for free if your university or lab has one to
  spare (Settings -> Pages -> Custom domain).
