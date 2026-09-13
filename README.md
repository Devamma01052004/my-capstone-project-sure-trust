# CPCB Real-Time AQI Pipeline

Capstone project for the SURE Trust Data Analytics programme.

A growing dataset built by pulling the live CPCB Air Quality Index feed
(data.gov.in) on a regular cadence and merging each snapshot into one master
file, working toward 10,000+ rows of real time-series coverage across Indian
monitoring stations.

## Live site

https://devamma01052004.github.io/my-capstone-project-sure-trust/

## What's on the site

- Hero section with an animated AQI dial
- Why it matters — the case for building this dataset
- Pipeline — the 4-step collection process (pull → clean → merge → analyse)
- Dataset stats + two illustrative charts (weekly trend, city comparison)
- Tech stack
- About

## Files

- `index.html` — page structure
- `style.css` — design, layout, responsive nav
- `app.js` — dial animation, scroll-reveal, mobile nav, sample charts

## Stack

Python · SQL · Excel · Power BI · data.gov.in API

## Deploying

This repo is set up for GitHub Pages. Push to the `main` branch, then in
**Settings → Pages** set the source to the `main` branch, root folder. The
site will be live at the URL above within a few minutes.

## To do before this is "real"

- Replace the illustrative chart values in `app.js` (`trendChart` and
  `cityChart`) with actual merged data once enough snapshots are collected
- Update the `SAMPLE_AQI` value in the hero dial
- Update dataset stats in the "Dataset at a glance" section with real numbers