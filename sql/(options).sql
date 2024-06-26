-- SQLite
CREATE TABLE IF NOT EXISTS options (
  id INTEGER PRIMARY KEY,
  questionId INTEGER,
  min REAL,
  max REAL,
  answer TEXT,
  isCorrect INTEGER,
  FOREIGN KEY(questionId) REFERENCES questions(id)
);