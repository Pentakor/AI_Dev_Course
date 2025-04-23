# PollSystem+ — EX2.2

This is a multi-user polling system built with Node.js and Express. It supports user management, poll creation, voting, and retrieving results — all in-memory, with fully documented API and internal architecture.

---

## 👥 Team Info

- **Lahav Rabinovitz** — 209028349
- **Sapir Levi** — 318776010
- **Adam Takrury** — 322907247
- **Irad Amsalem** - 209363639
- **David Weiss** - 325483006

---

## 💡 Design Assumptions

- All data is stored in memory using JavaScript Maps (no external DB).
- Each user is uniquely identified by their username.
- A poll contains a question and at least two unique, non-empty options.
- Votes are recorded as a map of `username → option index`.
- A user may only vote once per poll.
- Only the poll creator is authorized to delete their poll.
- Zod is used for request validation on API endpoints.

---

## 📚 API Summary

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/users` | Create a new user |
| POST   | `/api/users/vote/:id` | Submit a vote for a poll |
| GET    | `/api/users/voted-by/:username` | Get polls a user has voted in |

### Poll Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/polls` | Create a new poll |
| GET    | `/api/polls` | Get all polls |
| GET    | `/api/polls/created-by/:username` | Get polls created by a user |
| DELETE | `/api/polls/:id` | Delete a poll (by creator only) |

### Example Request/Response

#### POST `/api/users`

**Request body:**
```json
{ "username": "alice" }
```

**Response:**
```json
{ "message": "User created", "user": { "username": "alice" } }
```

#### POST `/api/polls`

**Request body:**
```json
{
  "creator": "alice",
  "question": "What is your favorite programming language?",
  "options": ["JavaScript", "Python", "Java"]
}
```

**Response:**
```json
{
  "message": "Poll created",
  "poll": {
    "id": "12345",
    "creator": "alice",
    "question": "What is your favorite programming language?",
    "options": ["JavaScript", "Python", "Java"],
    "votes": {}
  }
}
```

#### POST `/api/users/vote/:id`

**Request body:**
```json
{
  "username": "bob",
  "optionId": 1
}
```

**Response:**
```json
{ "message": "Vote recorded" }
```

#### DELETE `/api/polls/:id`

**Request body:**
```json
{ "username": "alice" }
```

**Response:**
```json
{ "message": "Poll deleted" }
```

---

## 🔧 Interface Contracts

### User Service
```ts
createUser(username: string): Promise<{ username: string }>
getUser(username: string): Promise<string | undefined>
voteOnPoll(id: string, username: string, optionId: number): Promise<Poll>
getVotedPollsByUser(username: string): Promise<Poll[]>
```

### Poll Service
```ts
createPoll({ creator, question, options }): Promise<Poll>
getPolls(): Promise<Poll[]>
getPollsByUser(username: string): Promise<Poll[]>
deletePoll(id: string, username: string): Promise<void>
```

### Poll Storage Interface
```ts
savePoll(poll): Promise<void>
getPoll(id): Promise<Poll | null>
deletePoll(id): Promise<boolean>
getAllPolls(): Promise<Poll[]>
getPollsByCreator(username): Promise<Poll[]>
```

### User Storage Interface
```ts
createUser(username): Promise<{ username: string }>
getUser(username): Promise<string | undefined>
```

---

## 🔁 Team Retrospective

### Reflections on Collaboration
We split responsibilities between backend logic, routing, validation and tests. GitHub was used for collaboration, and frequent updates were shared via group chat. Modular design helped us maintain clean separation of concerns and track code ownership.

### Lessons Learned on AI Usage
We used **ChatGPT** and **GitHub Copilot** to:
- Refactor files for modularity and readability
- Add and correct JSDoc documentation
- Structure Zod schema validation
- Generate and validate API documentation

The AI helped with speed and quality, but we made final architectural decisions and validations ourselves.
