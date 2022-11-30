# Web-Based Visualisation System for Divvy Data Analysis

## 🌎 Webpage Link

- [Our Webpage](https://duynguyen2001.github.io/Project3CS424/), hosted with **GitHub Pages**.
- [Repository hosting Webpage](https://github.com/duynguyen2001/Project3CS424).

## 🧾 Logistics

### Group Members

Raka Primardika (aprima3@uic.edu), Khanh Duy Nguyen (knguye71@uic.edu)

### Organisation

University of Illinois at Chicago, CS 424: Visualisation and Visual Analytics, Project 3

Project description can be found on this [direct link](https://fmiranda.me/courses/cs424-fall-2022/project-3/), or from the course [website](https://fmiranda.me/courses/cs424-fall-2022/).

## 🏞️ Background

We are analysing data from Divvy bicycle rideshare service in Chicago, IL, USA. Both of us are regular uses of the service, which adds to our familiarity and interest on working with their data.

## 🙋‍♂️ Domain Questions

Knowing that we are analysing Divvy data, we constructed this set of **domain questions** as our lines of inquiry. This was done before we took a close look at the dataset attributes. We did this so that we had a clear picture on what we are generally interested in finding out from the data.

- Q01: Do paid members use more e-bikes than non-paid users?
- Q02: At which times of the day do UIC students use Divvy bikes the most?
- Q03: Do people ride faster and farther in the afternoon compared to morning time?

These domain questions were driven from our personal experiences using Divvy bikes as UIC students.

Since Divvy increased their annual membership fee (see article [here](https://chi.streetsblog.org/2022/06/14/divvys-new-pricing-is-unaffordable-to-many-residents-and-therefore-inequitable/)) and are transitioning to electric bikes, we were interested in finding out whether people who are members use more electric bikes than casual members (hypothesis), taking advantage of the reduced prices. This was our main thought process behind **Q01**.

As UIC students, we were also interested in how other students use Divvy bikes for their commutes. First of all, we wanted to know what time of day they use bikes the most. We hypothesise that this would be afternoon time, around 16:00. Since we also think that students here use Divvy mainly to commute to and from home, we think that during those afternoon times, most people who use Divvy travel longer distances and as a result, longer commute times on bikes. This was our main idea for **Q02** and **Q03**.

After looking at the results of the previous questions in Project 2, we wanted to add another line of inquiry:

- Q04: Do members and casual riders ride in different areas?

We believe that since casual riders have been shown to use a higher proportion of electric bikes than members (Project 2 results), they would most likely be concentrated in areas farther from downtown. We believe that **Q04** is a good opportunity to create a spatial view visualisation.

## 📊 Dataset Description

The dataset we are handling spans from 24/10/2022 through 30/10/2022, which is only one week of data. This is _~85000_ rows. We believe that even though this is little, it's still sufficient to gather meaningful knowledge from the visualisations created from the data. We wanted to at least make sure we get all the days in the week, so that we can compare between the days.

_Note:_ Data was preprocessed using python. Code for this can be found under the `python/` folder. Python spits out data in the form of a `.csv` file. We further converted it to a `.json` file using a [CSV to JSON online converter](https://csvjson.com/csv2json).

The dataset contains various information: start and end time, start and end coordinates, member types, bike types, station IDs and ride IDs. We are most interested in the spatiotemporal data, combining them with the bike and member type data to produce meaningful plots.

Transformations we did was simply to add two columns, duration and distance of trips. More details can be found in the [transformations](#transformations) section.

## 🤨 Data Questions

- Q05: How do _e-bike and normal bike ridership_ ratios differ for each _membership type_?
- Q06: Given a _region_ in Chicago, how does the _number of all Divvy rides_ change for each _hour of the day_?
- Q07: Given a _time of the day_, how do _distance_ and _duration_ of trips compare for both _types of bikes_?

To answer **Q01**, we believe the appropriate data question is **Q05**, a simple ratio comparison between member vs casual riders and electric vs normal bike counts.

We decided to extend **Q02** to explore any region of Chicago, not just UIC. This would be a good opportunity to practice creating an interactive visualisation where the viewer gets to choose which part of Chicago they want to explore. For a given region that the viewer selects, we can make a plot showing the times of day where Divvy is most popular.

For **Q07**, our idea behind that was to simply compare trip distances and durations for a given time of day. The time of day attribute can be made interactive so that the viewer can choose it. We also decided to colour code the bike types as well just to see if there's a significant difference between e-bike and normal bike distances and durations.

Additional data question for this project:

- Q08: Given the type of member and the type of bike, how are Divvy rides concentrated in Chicago?

We thought it would be a good opportunity to implement a select-type interaction where the user can choose which member/bike type they're interested in finding out the answer for **Q04**.

### Transformations

The attributes _distance_ and _duration_ mentioned in **Q07** aren't available immediately from the raw dataset, but we can derive them from the attributes that are already there: `start_lat`, `start_lng`, `end_lat`, `end_lng`, `started_at` and `ended_at`. We create the new columns for these attributes.

Calculating duration was pretty simple. It was just a matter of finding the difference between `started_at` and `ended_at` and then converting from milliseconds to seconds.

Calculating distance was a bit trickier. We eventually made use of a function we were taught in our data structures class (_CS 251_ at UIC), where we had a project that dealt with distances. This function returns the **straight line distance** (or displacement, in physics terms) in _statute metres_, given the start and end coordinates, which of course we already have.

```js
function distBetween2Points(lat1, lon1, lat2, lon2) {
  //
  // Reference: http://www8.nau.edu/cvm/latlon_formula.html
  //
  const PI = Math.PI;
  const earth_rad_miles = 3963.1;  // statute miles
  const earth_rad_metres = 1609.34 * earth_rad_miles;  // statute metres

  var lat1_rad = lat1 * PI / 180.0;
  var lon1_rad = lon1 * PI / 180.0;
  var lat2_rad = lat2 * PI / 180.0;
  var lon2_rad = lon2 * PI / 180.0;

  const dist = earth_rad_metres * Math.acos(
    (Math.cos(lat1_rad) * Math.cos(lon1_rad) * Math.cos(lat2_rad) * Math.cos(lon2_rad))
    +
    (Math.cos(lat1_rad) * Math.sin(lon1_rad) * Math.cos(lat2_rad) * Math.sin(lon2_rad))
    +
    (Math.sin(lat1_rad) * Math.sin(lat2_rad))
  );
  
  return dist;
}
```

## 🗒️ Initial Plans and Sketches

Sketches can be found in the `sketches/` folder.

In our initial discussions, we wanted to have several modes of web pages, separated by the types of interaction.

| Sketch | Description |
| :---: | :----: |
| ![](sketches/webpage-design-v03.png) | This is our initial concept for our webpage. We are to switch between plots depending on the _mode_, selected by using the buttons on top of the page. In all modes, the full map will be shown as the background. Overlays of the map will change depending on the mode. |

Upon discussing, we eventually aggred to have three modes: brush mode, slider mode and select mode. This is our initial plan. Depending on our progress, this may change.

| Brush Mode | Slider Mode | Select Mode |
| :----------: | :-----------: | :-----------: |
| ![](sketches/webpage-design-v04.png) | ![](sketches/webpage-design-v05.png) | ![](sketches/webpage-design-v06.png) |
| _Brush mode_ is our linked view line plot from P2, where the interaction is from brushing points on the map. | _Slider mode_ is our single view scatterplot from P2, where the interaction is from using a slider. In this project, we propose to add a **new linked** _flow map_. | _Select mode_ allows interaction of selecting parts of the pie chart. The selected data is represented in the **new** heat map and the **new** bar chart. |
| _map scatter plot (spatial, linked, interact)_, _line chart (linked)_ | slider (interact), _scatter plot (linked)_, _flow map (spatial, linked)_ | _pie chart (interact, linked)_, _heat map (spatial, linked)_, _bar chart (linked)_ |

## 👷🏻‍♂️ Initial Work

For this project, we are deciding to use [React](https://reactjs.org/) to build our website.

In this repository, all the code is located in the `Project3CS424/cs424-project3/` folder. `Project3CS424/` is the root directory for our webpage, it's a copy of the repository we used for GitHub Pages.

## 🍂 Leaflet Concepts

For each mode, we propose to use the following Leaflet functionalities:

| Brush Mode | Slider Mode | Select Mode |
| :----------: | :-----------: | :-----------: |
| Leaflet Draw | Leaflet Circles | Leaflet Heatmap |
| ![](images/L-draw-concept.png) | ![](images/L-scatterpoints-concept.png) | ![](images/L-heatmap-corrected-concept.png) |
| Use the _polygon_ and _rectangle_ drawing tools. | Display the same points as in _Brush Mode_. | Density visualisation using [Leaflet Heatmap](https://github.com/Leaflet/Leaflet.heat) |

## 📸 Screenshots

| Home | Slider Mode |
| :--------: | :---------: |
| ![](images/screenshot-home.png) | ![](images/screenshot-slidermode.png) |
| **Select Mode** | **Brush mode** | 
| ![](images/screenshot-selectmode.png) | ![](images/screenshot-brushmode.png) |

## ✅ Task Completion

### Task 0

We set up our web page using **GitHub Pages**.

### Task 1

We have our web page done, made from scratch using _React_.

### Task 2

We used all three of our visualisations from Project 2. Two interactive ones include **brush mode** where we can brush over a map and changes are reflected in the line plot and the scatterplot in **slider mode**, which is a single view interactive plot.

### Task 3

Our new multiple linked view is the **select mode**. We introduce a new interaction method of selecting check boxes, and the data is reflected on the heatmap. The selection is based on our existing pie chart, making it a multiple linked view.

### Task 4

Our new spatial view plot is the heatmap in **select mode**, also part of the previous task. This was implemented using _Leaflet_.

### Task 5

1. This `README.md` is the markdown documentation.
2. Souce code is located in the `Project3CS424/` folder.
3. Screenshots of the web page can be found in the [📸 screenshots](#📸-screenshots) section or in the `images/` folder.
4. Web page is linked [here](https://duynguyen2001.github.io/Project3CS424/).
5. Presentation was done on Tuesday 29 November 2022 in class.

## References

- [Divvy Data](https://divvy-tripdata.s3.amazonaws.com/index.html)
- [Leaflet Draw Library Links](https://cdnjs.com/libraries/leaflet.draw)
- [React Tutorials and Documentation](https://reactjs.org/)
- [Leaflet Index Page](https://leafletjs.com/index.html)
- [Leaflet Basic Shapes](https://www.igismap.com/leafletjs-point-polyline-polygon-rectangle-circle/)
- [Leaflet Heatmap](https://github.com/Leaflet/Leaflet.heat)