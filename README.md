# Web-Based Visualisation System for Divvy Data Analysis

## 🔗 Quick Links

- [Observable Testing Collection](https://observablehq.com/collection/@rakaprimardika/cs-424-project-3) to practice making the plots without worrying about HTML placement.
- [React Tutorials and Documentation](https://reactjs.org/)
- [Leaflet Index Page](https://leafletjs.com/index.html)
- [Leaflet Basic Shapes](https://www.igismap.com/leafletjs-point-polyline-polygon-rectangle-circle/)
- [Leaflet Canvas Flowmap Layer](https://www.datarevelapp.com/leaflet_canvas/)
  - [Flowmap Tutorial](https://neiugis.github.io/lab6/)
- [Leaflet Heatmap](https://github.com/Leaflet/Leaflet.heat)

### Provisional Webpage Link

- [Our Webpage](https://duynguyen2001.github.io/Project3CS424/), hosted with **GitHub Pages**

## 🗒️ Sketches

Sketches can be found in the `sketches/` folder.

Concept is to have several _modes_ of plots. We propose to have three modes: brush mode, slider mode and select mode.

| Brush Mode | Slider Mode | Select Mode |
| :----------: | :-----------: | :-----------: |
| ![](sketches/webpage-design-v04.png) | ![](sketches/webpage-design-v05.png) | ![](sketches/webpage-design-v06.png) |
| _Brush mode_ concept is shown in [V4](sketches/webpage-design-v04.png). It is our linked view line plot from P2, where the interaction is from brushing points on the map. | _Slider mode_ concept is shown in [V5](sketches/webpage-design-v05.png). It is our single view scatterplot from P2, where the interaction is from using a slider. In this project, we propose to add a **new linked** _flow map_. | _Select mode_ concept is shown in [V6](sketches/webpage-design-v06.png). It allows interaction of selecting parts of the pie chart. The selected data is represented in the **new** heat map and the **new** bar chart. |
| _map scatter plot (spatial, linked, interact)_, _line chart (linked)_ | slider (interact), _scatter plot (linked)_, _flow map (spatial, linked)_ | _pie chart (interact, linked)_, _heat map (spatial, linked)_, _bar chart (linked)_ |

## 🍂 Leaflet Concepts

For each mode, we propose to use the following Leaflet functionalities:

| Brush Mode | Slider Mode | Select Mode |
| :----------: | :-----------: | :-----------: |
| Leaflet Draw | Leaflet Circles | Leaflet Heatmap |
| ![](images/L-draw-concept.png) | ![](images/L-scatterpoints-concept.png) | ![](images/L-heatmap-corrected-concept.png) |
| Use the _polygon_ and _rectangle_ drawing tools. | Display the same points as in _Brush Mode_. | Density visualisation using [Leaflet Heatmap](https://github.com/Leaflet/Leaflet.heat) |

## 👥 Group Members

Raka Primardika (aprima3@uic.edu), Khanh Duy Nguyen (knguye71@uic.edu)

## 👨🏻‍🏫 Note to Grader/Instructor

Our descriptions, results and reasonings can be found in the [💬 Summary](#💬-summary) section below.

We are using _<insert here>_ to host our web page.

## 💼 Portofolio Notes

This project was done under a duration of 3 weeks, presented on _TBD_. This is the final version/continuation of previous projects. For this class (CS 424), we did two projects already: [Project 1](https://github.com/uic-vis/project-1-raka-s-team) (September 2022) and [Project 2](https://github.com/uic-vis/project-2-raka-s-team) (October 2022).

_Note: both project repositories are private._

In both previous projects, plus this one, we are analysing data from _Divvy_, a bikeshare service in Chicago, IL, USA.

In Project 1, we practiced simple visualisations using Python. In Project 2, we familiarised ourselves with interactive visualisations using JavaScript and D3 on [Observable](https://observablehq.com/). In this final project, we are making a full website that hosts all of our previous visualisations, plus some new ones.

## 🔖 Project Description

Can be found on this [direct link](https://fmiranda.me/courses/cs424-fall-2022/project-3/), or from the course [website](https://fmiranda.me/courses/cs424-fall-2022/).

## 📝 Tasks/Checklist

### Tasks

- [x] Choose a _web hosting service_. **GitHub Pages**.
- [x] Sketch a design plan for the website.
- [x] Create an empty website with various components.
- [x] JavaScript code to load in data.
- [ ] Visualisation Requirements:
  - [ ] _Two_ interactive visualisations from _Project 2_.
  - [ ] _New_ multiple linked view visualisationusing a _different_ interaction mechanism.
  - [ ] _New_ spatial view visualisation. Recommended: link to other visualisations.

### Deliverables

- [ ] This markdown document.
- [ ] Source code and data files.
- [ ] Screenshot (`.png`) of visualisation interface.
- [x] _Link_ to a web page hosting our interface.
- [ ] Presentation **without** slides. Present web page interface live.

## 💬 Summary

### Background

We are analysing data from Divvy bicycle rideshare service in Chicago, IL, USA. Both of us are regular uses of the service, which adds to our familiarity and interest on working with their data.

### Dataset Description

The dataset we are handling spans from 24/10/2022 through 30/10/2022, which is only one week of data. This is _~85000_ rows. We believe that even though this is little, it's still sufficient to gather meaningful knowledge from the visualisations created from the data. We wanted to at least make sure we get all the days in the week, so that we can compare between the days.

The dataset contains various information: start and end time, start and end coordinates, member types, bike types, station IDs and ride IDs. We are most interested in the spatiotemporal data, combining them with the bike and member type data to produce meaningful plots.

### Interface Design

### Plot Choices

### Analysis and Findings

### Future Work

## References

- [Divvy Data](https://divvy-tripdata.s3.amazonaws.com/index.html)
- [Leaflet Draw Library Links](https://cdnjs.com/libraries/leaflet.draw)
