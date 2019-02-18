# Issue description
Loading Meteor dynamic imports from an array of file names causes it to never load. The following works:

```
Promise.all([
  import('/imports/file1.js'),
  import('/imports/file2.js'),
  import('/imports/file3.js'),
]);
```

But this doesn't:

```
const files = [
  '/imports/file1.js',
  '/imports/file2.js',
  '/imports/file3.js',
];
const promises = files.map(file => import(file));
Promise.all(promises);
```