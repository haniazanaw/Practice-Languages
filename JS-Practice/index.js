function calculateProduct(num1,num2){
    return num1*num2
}
console.log(calculateProduct(10,5));


function concatenateStrings(str1, str2) {
    result = str1 + str2
    return result
}

console.log(concatenateStrings("Ha","ni"));




function isGreaterThanFive(num) {
   if (num>5) {
    return "yes"
   }else{
    return "no"
   }
}
console.log(isGreaterThanFive(10));






class Node {
  constructor(name, wheelchairAccess = false) {
    this.name = name;
    this.edges = [];
    this.wheelchairAccess = wheelchairAccess;
  }
}
class Edge {
  constructor(toNode, timeCost) {
    this.toNode = toNode;
    this.timeCost = timeCost;
  }
}
function dijkstra(startNode, maxTime) {
  const times = new Map([[startNode.name, 0]]);
  const visited = new Set();
  const heap = [[0, startNode]];
  while (heap.length > 0) {
    heap.sort((a, b) => a[0] - b[0]);  // Min-heap
    const [currentTime, node] = heap.shift();
    if (visited.has(node.name)) continue;
    visited.add(node.name);
    for (let edge of node.edges) {
      const time = currentTime + edge.timeCost;
      if (time <= maxTime && (!times.has(edge.toNode.name) || time < times.get(edge.toNode.name))) {
        times.set(edge.toNode.name, time);
        heap.push([time, edge.toNode]);
      }
    }
  }
  return times;
}


// Sample data structures:
// students = [{id, location: {x,y}, needsWheelchair: boolean}]
// stops = [{id, location: {x,y}}]
// buses = [{id, capacity, wheelchairAccessible: boolean}]
// maxRideTime in minutes, trafficFactor is multiplier >1 for congested areas

function optimizeBusRoutes(students, stops, buses, maxRideTime, trafficFactor) {
  // Helper: Euclidean distance (can be replaced with real road distance)
  function distance(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx*dx + dy*dy);
  }

  // Assign students to nearest stop
  let stopAssignments = {};
  stops.forEach(s => stopAssignments[s.id] = []);
  students.forEach(student => {
    let nearestStop = stops.reduce((nearest, stop) => {
      let dist = distance(student.location, stop.location);
      return dist < nearest.dist ? {stop, dist} : nearest;
    }, {stop: null, dist: Infinity}).stop;
    stopAssignments[nearestStop.id].push(student);
  });

  // Group stops into routes heuristically (simple clustering by proximity)
  // and assign buses considering wheelchair needs
  let routes = [];
  let unassignedStops = stops.filter(s => stopAssignments[s.id].length > 0);

  while (unassignedStops.length > 0) {
    let routeStops = [];
    let routeStudents = [];
    let capacityLeft = buses[0].capacity; // assume homogeneous bus capacity for simplicity
    let wheelchairNeeded = false;

    // Start route with first unassigned stop
    let currentStop = unassignedStops.shift();
    routeStops.push(currentStop);
    routeStudents.push(...stopAssignments[currentStop.id]);
    capacityLeft -= stopAssignments[currentStop.id].length;
    if (stopAssignments[currentStop.id].some(s => s.needsWheelchair)) wheelchairNeeded = true;

    // Try to add more stops while respecting capacity and maxRideTime
    for (let i = unassignedStops.length - 1; i >= 0; i--) {
      let candidateStop = unassignedStops[i];
      let candidateStudents = stopAssignments[candidateStop.id];
      if (candidateStudents.length <= capacityLeft) {
        // Estimate added ride time (distance * traffic factor)
        let addedTime = distance(routeStops[routeStops.length - 1].location, candidateStop.location) * trafficFactor;
        if (addedTime <= maxRideTime) {
          routeStops.push(candidateStop);
          routeStudents.push(...candidateStudents);
          capacityLeft -= candidateStudents.length;
          if (candidateStudents.some(s => s.needsWheelchair)) wheelchairNeeded = true;
          unassignedStops.splice(i, 1);
        }
      }
    }

    // Assign a bus with wheelchair access if needed
    let assignedBus = buses.find(b => !wheelchairNeeded || b.wheelchairAccessible);
    if (!assignedBus) {
      console.log("No suitable bus for wheelchair access");
      assignedBus = buses[0]; // fallback
    }

    routes.push({
      busId: assignedBus.id,
      stops: routeStops.map(s => s.id),
      students: routeStudents.map(s => s.id),
      wheelchairAccessible: wheelchairNeeded
    });
  }

  return routes;
}



const student1 = { name: "Nebyat", scores: [90, 70, 50] };
const student2 = { name: "Arsema", scores: [90, 70, 80] };
const student3 = { name: "Hani", scores: [100, 70, 60] };

const students = [student1, student2, student3];

function studentStatistics(students) {
  const studentsStatistics = [];

  students.forEach(student => {
    const scores = student.scores;
    const sum = scores.reduce((acc, curr) => acc + curr, 0);
    const average = sum / scores.length;
    const minimum = Math.min(...scores);
    const maximum = Math.max(...scores);

    const statistics = [minimum, maximum, average];
    const studentData = { name: student.name, scores_statistics: statistics };
    studentsStatistics.push(studentData);
  });

  return studentsStatistics;
}

console.log(studentStatistics(students));






function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

const myCar = new Car("Eagle", "Talon TSi", 1993);
console.log(myCar);





//callback
const hello = (name) => {
    console.log(`Hello, there! ${name}`);
}
const greet = (name,hello) => {
    console.log(`Hello ${name}`);
    hello(name);
}
greet("Henry", hello);
// setTimeout(() => {
//     console.log('This ia  a timeout');
// },2000);
// setInterval(() => {
//     console.log('THis is an interval.');
// },3000);
//Closure
const outerFunction = () => {
    let person = 'John';
    function innerFunction(){
        console.log(`Hi ${person}`);
    }
    return innerFunction;
};
console.log(outerFunction()); //output --> [Function: innerFunction]
const callOuterFunction = outerFunction();
callOuterFunction();
//promises
const internship = true;
const promise = new Promise (function(resolve, reject){
    if(internship){
        resolve('I will visit you.')
    }
    else{
        reject('I am looking for a job.')
    }
});
promise
.then(() => {
    console.log('I have an internship.');
})
.catch(()=>
console.log('There is still to get a job.'))
.finally(()=> {
    console.log('I enjoyed my time at AkiraChix.');
});
console.log({promise});
const tour =new Promise((resolve,reject) =>{
    setTimeout(()=>{
        // resolve("I want to tour Mombasa.")
        reject('I do not want to tour' )
    },4000);
}
);
async function visitPlaces (){
    try{
        const visit = await tour;
            console.log({visit});
    }
    catch(error){
        console.log({error});
    }
}
visitPlaces()





// cop
// Function sendReminder(email):
//     Wait for 5 seconds
//     Log "Reminder sent to [email]"

// users = [user1, user2, user3]

// For each user in users:
//     Call sendReminder(user)



async function sendReminder(email) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log(`Reminder sent to ${email}`);
}

const users = [
    "user1@example.com",
    "user2@example.com",
    "user3@example.com"
];

for (const email of users) {
    sendReminder(email);
}

// goo
// FUNCTION sendReminder(email):
//   SET delayTime TO 5000 (milliseconds)

//   WAIT FOR delayTime seconds using setTimeout

//   LOG "Reminder sent to [email]"
// END FUNCTION

// CREATE an array of 3 user emails
// LOOP through each email in the array:
//   CALL sendReminder(email)
// END LOOP


async function sendReminder(email) {
  await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds

  console.log(`Reminder sent to ${email}`);
}

// Simulate sending reminders to 3 users
const userEmails = ['haniazanaw@744gmail.com', 'naolwakjira@gmail.com', 'hassetabera@gmail.com'];

for (const email of userEmails) {
  sendReminder(email);
}






// cop
// Initialize loginAttempt counter to 0

// Function tryLogin():
//     Define inner function attemptLogin():
//         Increment loginAttempt
//         Wait 1 second (setTimeout)
//         If loginAttempt < 3:
//             Log "Attempt [loginAttempt]: Login failed"
//             Call attemptLogin() again
//         Else if loginAttempt == 3:
//             Resolve Promise and log "Login successful"

//     Return a Promise that starts attemptLogin()

// Call tryLogin()
//     If resolved, do nothing (already logged)
//     If rejected (not expected in this scenario), log "Login failed after 3 attempts"


// Simulate login attempts
tryLogin()
    .catch(() => {
        console.log("Login failed after 3 attempts");
    });


//     3.cop
//     Initialize counter to 5

// Start interval that runs every 1 second:
//     Display the current counter value
//     Decrease counter by 1
//     If counter is less than 0:
//         Stop the interval
//         Log "Time's up!"

// Function to run a countdown timer from 5 to 0
function countdownTimer() {
    let counter = 5;
    const intervalId = setInterval(() => {
        console.log(counter);
        counter--;
        if (counter < 0) {
            clearInterval(intervalId);
            console.log("Time's up!");
        }
    }, 1000);
}

// Start the countdown
countdownTimer();

// 3.goo
// Pseudocode
// Initialize:
// Set a variable count to 5.
// Set a variable intervalId to null.
// Start the countdown:
// Use setInterval to call a function every 1000 milliseconds (1 second).
// Inside the interval function:
// Log the current value of count.
// Decrement count by 1.
// If count is less than 0:
// Clear the interval using clearInterval(intervalId).
// Log "Time's up!".
// Store the interval id:
// Store the return value of setInterval in intervalId

function countdownTimer() {
  let count = 5;
  let intervalId = null;

  intervalId = setInterval(() => {
    console.log(count);
    count--;

    if (count < 0) {
      clearInterval(intervalId);
      console.log("Time's up!");
    }
  }, 1000);
}

countdownTimer();


// 4.goo
// Function to run a countdown timer from 5 to 0
function countdownTimer() {
    let counter = 5;
    const intervalId = setInterval(() => {
        console.log(counter);
        counter--;
        if (counter < 0) {
            clearInterval(intervalId);
            console.log("Time's up!");
        }
    }, 1000);
}

// Start the countdown
countdownTimer();




// cop
// # Pseudocode:
// # 1. Define an async function loadPage().
// # 2. Log "Loading header...".
// # 3. Create a Promise that resolves after 1 second using setTimeout.
// # 4. Await the Promise.
// # 5. Log "Loading content...".
// # 6. Create a Promise that resolves after 2 seconds using setTimeout.
// # 7. Await the Promise.
// # 8. Log "Loading footer...".
// # 9. Create a Promise that resolves after 1 second using setTimeout.
// # 10. Await the Promise.
// # 11. Log "Page fully loaded".


async function loadPage() {
  console.log("Loading header...");

  // Wait 1 second
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log("Loading content...");

  // Wait 2 seconds
  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log("Loading footer...");

  // Wait 1 second
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log("Page fully loaded");
}

// Call the async function
loadPage();

// 5


function fetchPrice(symbol) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Price for ${symbol} retrieved`);
        }, 2000);
    });
}


async function main() {
    const result1 = await fetchPrice("AAPL");
    console.log(result1);

    const result2 = await fetchPrice("GOOG");
    console.log(result2);
}


main();





class Voter {
    constructor(citizenId, voteStatus = false) {
        this.citizenId = citizenId;
        this.voteStatus = voteStatus;
    }
}

class Candidate {
    constructor(candidateId, count = 0) {
        this.candidateId = candidateId;
        this.count = count;
    }
}

class Vote {
    constructor(citizenId, candidateId) {
        this.citizenId = citizenId;
        this.candidateId = candidateId;
    }
}


class ElectionSystem {
    constructor(voters, candidates) {
        this.voters = voters;
        this.candidates = candidates;
    }

    processVote(vote) {
        const voter = this.voters.find(v => v.citizenId === vote.citizenId);
        if (!voter) {
            throw new Error('Fraud detected: citizen ID not found in eligible voters');
        }
        if (voter.voteStatus) {
            throw new Error('Citizen has already voted');
        }
        const candidate = this.candidates.find(c => c.candidateId === vote.candidateId);
        if (!candidate) {
            throw new Error('Invalid candidate ID');
        }
       
        candidate.count += 1;
        voter.voteStatus = true;
        return this.candidates;
    }
}


const voters = [
    new Voter('123', false),
    new Voter('456', false),
];
const candidates = [
    new Candidate('A', 0),
    new Candidate('B', 0),
];
const election = new ElectionSystem(voters, candidates);
const vote = new Vote('123', 'A');
try {
    const updatedCandidates = election.processVote(vote);
    console.log("Updated candidate counts:");
    updatedCandidates.forEach(c => console.log(`${c.candidateId}: ${c.count}`));
} catch (err) {
    console.error(err.message);
}