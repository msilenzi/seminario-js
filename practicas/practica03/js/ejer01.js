const elements = [22, 44, 78, -43, 89]

const point1 = { x: 0.0, y: 0.0 }
const point2 = { x: 3.0, y: 0.0 }
const point3 = { x: 0.0, y: 3.0 }

let triangle = {
  corners: [point1, point2, point3],
}

console.log(JSON.stringify(elements))  
// [22,44,78,-43,89]

console.log(JSON.stringify(point1))    
// {"x":0,"y":0}

console.log(JSON.stringify(triangle))  
// {"corners":[{"x":0,"y":0},{"x":3,"y":0},{"x":0,"y":3}]}
