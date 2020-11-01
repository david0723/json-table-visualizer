# JSON to table visualizer

Dynamic JSON to table visualizer made with react. See the demo [here](https://json-table-visualizer.vercel.app/).

## The problem

Given a JSON data set that consists of an array of items, where each item has:
- a variable set of properties (dynamic object).
- zero or more nested child items

Visualize this data with a hierarchy table component, that allows the removal of items. Removing an item in the UI should remove the item and all of their nested children.

## The solution

React was used to render this nested data structure recursively, and to handlde the state management with the context api. 

## Setting up the project

The project is built on top of create-react-app, so there's not much to set up.

Just clone the repo:
```
git clone https://github.com/david0723/json-table-visualizer.git
cd json-table-visualizer
```

Install dependencies:
```
yarn
```
And run the app:
```
yarn start
```

## Tests

There are unit tests for some of the utility functions and integration tests to test the corrrect behaviour of the features.
