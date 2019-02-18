import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  // Loading imports via forEach, map, for loop, etc. throws
  // an error like "Error: Cannot find module '/imports/file1.js'"
  const files = [
    '/imports/file1.js',
    '/imports/file2.js',
    '/imports/file3.js',
  ];
  const promises = files.map(file => import(file));
  Promise.all(promises)
  .then(() => {
    console.log('All files loaded!');
  })
  .catch(loadError => {
    console.log('Files failed to load: ', loadError);
  });
  // Uncommenting the code below makes this work fine.
  // Promise.all([
  //   import('/imports/file1.js'),
  //   import('/imports/file2.js'),
  //   import('/imports/file3.js'),
  // ])
  // .then(() => {
  //   console.log('All files loaded!');
  // })
  // .catch(loadError => {
  //   console.log('Files failed to load: ', loadError);
  // })
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
