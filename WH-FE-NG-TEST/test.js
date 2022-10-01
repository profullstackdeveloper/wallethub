const array = ["cat", 'bear', 'apple', 'letter'];
var regex = /(([a-z]))/g
const text = `<b>John</b><script>/* *\x2A/javascript:alert(1)// */</script>   <a>asdasd</a><script>/* *\x2A/javascript:alert(1)// */</script><a></a>`

const a = text.replace(/<script.*>.*<\/script>/ims, "")

console.log('a', a);

const b = a.replace(/(<([^>]+)>)/ig, "");

console.log("result is ", b);


array.sort((former, latter) => {
    return former < latter ? 1 : -1;
})

console.log(array);