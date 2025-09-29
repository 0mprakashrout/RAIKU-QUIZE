import { useState } from 'react';

const styles = {
  container: { 
    maxWidth: '720px', 
    margin: '40px auto', 
    padding: '24px', 
    background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    borderRadius: '16px', 
    boxShadow: '0 8px 40px rgba(0,0,0,0.2)', 
    fontFamily: 'Arial, sans-serif',
    color: '#f3f4f6',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  startScreen: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', padding: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', textAlign: 'center', maxWidth: '500px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '12px', width: '100%' },
  question: { marginTop: '20px', fontSize: '20px', fontWeight: '600' },
  choices: { display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px', width: '100%' },
  choice: { padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', background: 'rgba(255,255,255,0.05)', transition: '0.2s', fontSize: '16px', color: '#f3f4f6' },
  choiceSelected: { background: 'rgba(59,130,246,0.3)', borderColor: '#3b82f6' },
  correctAnswer: { background: 'rgba(16,185,129,0.3)', borderColor: '#10b981', color: '#d1fae5', fontWeight: '600' },
  incorrectAnswer: { background: 'rgba(239,68,68,0.3)', borderColor: '#ef4444', color: '#fee2e2', fontWeight: '600' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '12px', width: '100%' },
  button: { padding: '10px 16px', borderRadius: '10px', border: 'none', background: 'linear-gradient(to right, #4f46e5, #6366f1)', color: 'white', cursor: 'pointer', fontWeight: '600', fontSize: '16px', transition: '0.2s' },
  small: { padding: '10px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: '#f3f4f6', cursor: 'pointer', fontWeight: '500', transition: '0.2s' }
};

export default function QuizApp() {
  const QUESTIONS = [
    { q: "What is Raiku’s primary goal on Solana?", choices: ["To create NFTs","To bring enterprise-grade certainty and reliability to on-chain infrastructure","To build a new L1","To replace smart contracts"], answer: 1 },
    { q: "What problem in blockchain infrastructure does Raiku aim to solve?", choices: ["Unclear regulations","Slow wallets","Infrastructure fragility, failed transactions, and unreliable performance","Gas fees being too low"], answer: 2 },
    { q: "Raiku transforms blockspace into what kind of resource?", choices: ["A free resource","A random commodity","A guaranteed, programmable resource","An external service"], answer: 2 },
    { q: "Which of these is a Raiku technology highlight?", choices: ["Sub-30 ms pre-confirmations","NFT minting","Free hosting","Decentralized storage"], answer: 0 },
    { q: "What two modes of blockspace access does Raiku provide?", choices: ["Reserved & Random","Just-in-Time & Ahead-of-Time (reserved)","Spot & Futures","Static & Dynamic"], answer: 1 },
    { q: "With how few lines of code can Raiku Lite mode be integrated?", choices: ["20 lines","10 lines","2 lines","50 lines"], answer: 2 }
  ];

  const [index, setIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);

  const current = QUESTIONS[index];

  const nextQuestion = () => {
    if (selected === null) return;
    if (selected === current.answer) setScore(prev => prev + 1);

    if (index + 1 < QUESTIONS.length) {
      setIndex(prev => prev + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      setIndex(QUESTIONS.length);
    }
  };

  const handleChoice = (i: number) => {
    setSelected(i);
    setShowAnswer(true);
  };

  const restartQuiz = () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setShowAnswer(false);
    setStarted(false);
  };

  if (!started) {
    return (
      <div style={styles.container}>
        <div style={styles.startScreen}>
          <h1>RIALO</h1>
          <p>Test Your Knowledge</p>
          <h2>Welcome to QuizMaster!</h2>
          <p>Test your knowledge with our interactive quiz. You'll get immediate feedback on each question and see your final score at the end.</p>
          <button style={styles.button} onClick={() => setStarted(true)}>Start Quiz</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Raiku Quiz</h1>
        {index < QUESTIONS.length && <div>Question {index + 1}/{QUESTIONS.length}</div>}
      </div>

      {index < QUESTIONS.length ? (
        <>
          <div style={styles.question}>{current.q}</div>
          <div style={styles.choices}>
            {current.choices.map((c, i) => (
              <div
                key={i}
                style={{ 
                  ...styles.choice, 
                  ...(selected === i ? styles.choiceSelected : {}),
                  ...(showAnswer && i === current.answer ? styles.correctAnswer : {}),
                  ...(showAnswer && selected !== current.answer && i === selected ? styles.incorrectAnswer : {})
                }}
                onClick={() => handleChoice(i)}
              >
                {c}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2>Your score: {score}/{QUESTIONS.length}</h2>
          <p>{score === QUESTIONS.length ? 'Perfect! Nice work.' : 'Good try — you can retake it.'}</p>
          <button style={styles.button} onClick={restartQuiz}>Play again</button>
        </>
      )}

      {index < QUESTIONS.length && (
        <div style={styles.footer}>
          <button style={styles.small} onClick={restartQuiz}>Restart</button>
          <button style={styles.button} onClick={nextQuestion}>Next</button>
        </div>
      )}
    </div>
  );
}
