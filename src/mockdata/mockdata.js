// const mockData = [];
// const now = new Date();
// /* eslint-disable */
// for (let index = 0; index < 24; index++) {
//   // const newLocal = new Date(
//   //   now.getFulltime(),
//   //   now.getMonth(),
//   //   now.getDay(),
//   //   now.getHours(),
//   //   now.getMinutes() * index
//   // );
//   var date = new Date(now.getTime());
//   date.setHours(now.getHours() + index);
//   mockData.push({
//     price: 10 * 2.5 * index,
//     time: date
//   });
// }
// export default mockData;

const mockData = [];
const now = new Date();
const keys = [
  { key: 'Newyork', val: 50 },
  { key: 'San Francisco', val: 70 },
  { key: 'San Jose', val: 75 },
  { key: 'Chicago', val: 60 },
  { key: 'Chicago1', val: 30 }
];
const maxlen = 24;
keys.forEach(data => {
  /* eslint-disable */
  for (let index = 0; index < maxlen; index++) {
    /* eslint-enable */
    const inc = index > maxlen / 2 ? 0 - index : index;
    const date = new Date(now.getTime());
    date.setMinutes(now.getHours() + index);
    mockData.push({
      key: data.key,
      temperature: data.val + inc,
      time: date
    });
  }
});
// const mockData = [
//   {
//     Client: 'ABC',
//     price: '202',
//     time: '2000'
//   },
//   {
//     Client: 'ABC',
//     price: '215',
//     time: '2002'
//   },
//   {
//     Client: 'ABC',
//     price: '179',
//     time: '2004'
//   },
//   {
//     Client: 'ABC',
//     price: '199',
//     time: '2006'
//   },
//   {
//     Client: 'ABC',
//     price: '134',
//     time: '2008'
//   },
//   {
//     Client: 'ABC',
//     price: '176',
//     time: '2010'
//   },
//   {
//     Client: 'XYZ',
//     price: '100',
//     time: '2000'
//   },
//   {
//     Client: 'XYZ',
//     price: '215',
//     time: '2002'
//   },
//   {
//     Client: 'XYZ',
//     price: '179',
//     time: '2004'
//   },
//   {
//     Client: 'XYZ',
//     price: '199',
//     time: '2006'
//   },
//   {
//     Client: 'XYZ',
//     price: '134',
//     time: '2008'
//   },
//   {
//     Client: 'XYZ',
//     price: '176',
//     time: '2013'
//   }
// ];
export default mockData;
