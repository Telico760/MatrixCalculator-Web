# Matrix Calculator — GitHub Pages Edition

A free, responsive matrix calculator built with **HTML, CSS, and vanilla JavaScript**. This is a browser-only conversion of the original Flask project. No Python, Flask, Java, database, build step, or server is required.

## Features

- Add, subtract, and multiply matrices
- Adjustable 1×1 through 10×10 matrices
- Decimal and negative numbers
- Dimension validation and helpful errors
- Swap matrices, reset examples, copy results
- Responsive layout for mobile and desktop
- Calculations run locally in the browser (no data sent to a server)

## Run locally

Open `index.html` in a modern browser. No installation is required.

## Publish on GitHub Pages

1. Create a new **public** GitHub repository, e.g. `MatrixCalculator-Web`.
2. Upload the **contents** of this folder to the repository root (`index.html`, `assets/`, `.nojekyll`, etc.).
3. Go to repository **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select **main** and **/(root)**, then **Save**.
6. Wait for GitHub to show the published site URL. Typically:
   `https://YOUR_USERNAME.github.io/MatrixCalculator-Web/`

If you use Git from the terminal, initialize this folder and push to the new empty repository:

```bash
git init
git branch -M main
git add .
git commit -m "Publish static Matrix Calculator"
git remote add origin git@github.com:YOUR_USERNAME/MatrixCalculator-Web.git
git push -u origin main
```

If your repository already contains the Flask app, use a **new repository** for this edition, or deliberately replace its tracked contents. Do not accidentally delete the Flask version.

## Files

- `index.html`: browser interface
- `assets/style.css`: original responsive visual design
- `assets/app.js`: UI and JavaScript matrix algorithms
- `.nojekyll`: disables unnecessary Jekyll processing on Pages
- `LICENSE`: MIT license

## Test examples

For A = `[[1,2],[3,4]]`, B = `[[5,6],[7,8]]`:
- Add: `[[6,8],[10,12]]`
- Subtract: `[[-4,-4],[-4,-4]]`
- Multiply: `[[19,22],[43,50]]`

For multiplication, the number of columns in A must equal the number of rows in B.

## Technical notes

This static version does not use the Flask `/api/calculate` endpoint; all arithmetic is performed by `matrixCalculate()` in `assets/app.js`. GitHub Pages only serves static files. Calculations use JavaScript numbers (IEEE 754 double precision), so extremely large values may lose precision.
