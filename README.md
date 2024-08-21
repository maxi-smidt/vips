# VIPS - Visualizer International Patient Summary

<!-- TOC -->
* [VIPS - Visualizer International Patient Summary](#vips---visualizer-international-patient-summary)
  * [Getting Started](#getting-started)
    * [Run the app](#run-the-app)
    * [Linting](#linting-)
  * [Conventions](#conventions)
    * [Branches](#branches)
    * [Pull Requests](#pull-requests)
    * [Coding](#coding)
  * [Existing IPS Viewers](#existing-ips-viewers)
<!-- TOC -->

## Getting Started

### Run the app
Using the app the first time, you will need to install all packages using `npm install`.
To start the application for development run `npm run dev` or `next dev` and open [http://localhost:3000](http://localhost:3000).

### Linting 
To assure a unified coding style, eslint is configured. You can start linting with `next lint`. For easier usage you can
enable _Run eslint --fix on save_ in _Settings_->_Language & Frameworks_->_JavaScript_->_Code Quality Tools_->_ESLint_.

## Conventions

### Branches

Branches should be categorized (_feature_, _bug_, _research_) and end with the issue number.

e.g. `feature/12`, `bug/3`

### Pull Requests

The person who creates a branch should open a _PR_ for it. A different person should review the changes and either 
comment on why it cannot be merged, or merge the _PR_. For merging the _PR_ select `Sqash and merge` and delete the 
remaining branch afterward.

### Coding


## Existing IPS Viewers

[Open comparison](docs/research/research-viewers.md)
