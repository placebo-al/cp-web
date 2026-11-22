My workout library, moving the routines from Excel into a browser to practise JavaScript.

## Programmes

- **Core Performance:** four phases covering weeks 1–3, 4–6, 7–9 and 10–12.
- **Essentials:** a separate programme with its own four levels and stage progression.
- **Performance Strength:** Foundation, Get Stable, Get Strong, Work and Get Powerful. Each stage has three weeks and four workout days: Power A, B, C and D. Prescriptions follow the detailed stage sheets, with empty fields omitted.
- **SAS:** Beginner, Intermediate, Advanced and Professional workouts.

The CP week ranges follow the `Week1-3`, `Week4-6`, `Week7-9` and `Week10-12` sheets in the reference workbook. Essentials corresponds to `CP-Essentials`. The workbook is a local reference and is not published in this repository.

## Preview and checks

Serve the parent directory to reproduce GitHub Pages' `/cp-web/` subdirectory:

```sh
cd ..
python -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/cp-web/index.html`.

With Node.js installed, run `npm test` (no dependencies to install). Tests cover shared navigation at root and nested deployment paths, programme separation, local links and assets, and the SAS exercise-table scripts.

`index.js` owns the shared header. Links resolve relative to that script rather than the current page, so navigation works from phase and SAS subfolders. SAS scripts contain their exercise data only. Existing exercise tables and prescriptions are retained.

GitHub Pages serves the root of the `main` branch at https://placebo-al.github.io/cp-web/.
