
def check():
    age = 35
    salary = 6000

    if age >= 30 and salary >= 5000:
        print('Eligible for the premium membership.')
    else:
        print('Not eligible for the premium membership')

        
student1 = {"name": "Nebyat", "scores": [90, 70, 50]}
student2 = {"name": "Arsema", "scores": [90, 70, 80]}
student3 = {"name": "Hani", "scores": [100, 70, 60]}

students = [student1, student2, student3]

def student_statistics(students):
    students_statistics = []
    for student in students:
        average = sum(student["scores"]) / len(student["scores"])
        minimum = min(student["scores"])
        maximum = max(student["scores"])
        statistics = [minimum, maximum, average]
        student_data = {"name": student["name"], "scores_statistics": statistics}
        students_statistics.append(student_data)
    return students_statistics


print(student_statistics(students))


1. Python (Euclidean Distance)
students = [
    {"id": 1, "location": (1.290270, 36.821946)},
    {"id": 2, "location": (1.292030, 36.822000)},
    {"id": 3, "location": (1.289000, 36.819000)},
]
bus_stops = [
    {"id": "A", "location": (1.291000, 36.820000)},
    {"id": "B", "location": (1.293000, 36.823000)},
]
bus_capacity = 2
buses = {}
def euclidean(p1, p2):
    return ((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2) ** 0.5
for student in students:
    nearest = min(bus_stops, key=lambda stop: euclidean(student["location"], stop["location"]))
    stop_id = nearest["id"]
    if stop_id not in buses:
        buses[stop_id] = []
    buses[stop_id].append(student["id"])
for stop, group in buses.items():
    grouped = [group[i:i + bus_capacity] for i in range(0, len(group), bus_capacity)]
    print(f"Stop {stop} buses: {grouped}")




from dataclasses import dataclass
from typing import List
@dataclass
class Voter:
    citizen_id: str
    vote_status: bool = False
@dataclass
class Candidate:
    candidate_id: str
    count: int = 0
@dataclass
class Vote:
    citizen_id: str
    candidate_id: str
class ElectionSystem:
    def __init__(self, voters: List[Voter], candidates: List[Candidate]):
        self.voters = voters
        self.candidates = candidates
    def process_vote(self, vote: Vote) -> List[Candidate]:
        voter = next((v for v in self.voters if v.citizen_id == vote.citizen_id), None)
        if voter is None:
            raise Exception("Fraud detected: citizen ID not found in eligible voters.")
        if voter.vote_status:
            raise Exception("Citizen has already voted.")
        candidate = next((c for c in self.candidates if c.candidate_id == vote.candidate_id), None)
        if candidate is None:
            raise Exception("Invalid candidate ID.")
        candidate.count += 1
        voter.vote_status = True
        return self.candidates

if __name__ == "__main__":
    voters = [
        Voter("123", False),
        Voter("456", False)
    ]
    candidates = [
        Candidate("A", 0),
        Candidate("B", 0)
    ]
    election = ElectionSystem(voters, candidates)
    vote = Vote("123", "A")
    try:
        updated_candidates = election.process_vote(vote)
        print("Updated candidate counts:")
        for c in updated_candidates:
            print(f"{c.candidate_id}: {c.count}")
    except Exception as e:
        print("Error:", e)






def process_vote(voters, candidates, vote):
   
    voter = next((v for v in voters if v["citizen_id"] == vote["citizen_id"]), None)
    if not voter:
        return "Fraud detected"

   
    if voter["vote_status"]:
        return "Citizen has already voted"

  
    candidate = next((c for c in candidates if c["candidate_id"] == vote["candidate_id"]), None)
    if not candidate:
        return "Invalid candidate ID"

   
    candidate["count"] += 1
    voter["vote_status"] = True

    return candidates


voters = [
    {"citizen_id": 1, "vote_status": False},
    {"citizen_id": 2, "vote_status": False}
]
candidates = [
    {"candidate_id": "A", "count": 0},
    {"candidate_id": "B", "count": 0}
]
vote = {"citizen_id": 1, "candidate_id": "A"}

result = process_vote(voters, candidates, vote)
print(result)