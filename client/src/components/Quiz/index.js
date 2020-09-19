import React, { Component } from "react";
import Quiz from "./Quiz";
import Result from "./Result";
import quizQuestions from "./quizQuestions";
import { PropTypes } from "react";

// export default (props) => {
//   const [quizObj, setQuizObj] = React.useState({
//     counter: 0,
//     questionId: 1,
//     question: "",
//     answerOptions: [],
//     answer: "",
//     answersCount: {},
//     result: "",
//   });

//   React.useEffect(() => {
//     const shuffledAnswerOptions = quizQuestions.map((question)s =>
//       shuffleArray(question.answers)
//     );
//     setQuizObj({
//       ...quizObj,
//       question: quizQuestions[0].question,
//       answerOptions: shuffledAnswerOptions[0],
//     });
//   }, []);

//   const handleSubmit = () => {
//     props.handleSubmit(quizObj.answerOptions);
//   };

//   const shuffleArray = (array) => {
//     var currentIndex = array.length,
//       temporaryValue,
//       randomIndex;

//     // While there remain elements to shuffle...
//     while (0 !== currentIndex) {
//       // Pick a remaining element...
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex -= 1;

//       // And swap it with the current element.
//       temporaryValue = array[currentIndex];
//       array[currentIndex] = array[randomIndex];
//       array[randomIndex] = temporaryValue;
//     }

//     return array;
//   };

//   const handleAnswerSelected = (event) => {
//     setUserAnswer(event.currentTarget.value);

//     if (quizObj.questionId < quizQuestions.length) {
//       setTimeout(() => setNextQuestion(), 300);
//     } else {
//       setTimeout(() => setResults(getResults()), 300);
//     }
//   };

//   const setUserAnswer = (answer) => {
//     let answerCount = quizObj.answersCount.answer || 0;

//     let obj = {
//       ...quizObj,
//       answersCount: { ...quizObj.answersCount, [answer]: answerCount + 1 },
//     };
//     console.log("obj", obj);
//     setQuizObj(obj);
//     // this.setState((state, props) => ({
//     //   answersCount: {
//     //     ...state.answersCount,
//     //     [answer]: (state.answersCount[answer] || 0) + 1,
//     //   },
//     //   answer: answer,
//     // }));
//   };

//   const setNextQuestion = () => {
//     const counter = quizObj.counter + 1;
//     const questionId = quizObj.questionId + 1;

//     setQuizObj({
//       ...quizObj,
//       counter,
//       questionId,
//       question: quizQuestions[counter].question,
//       answerOptions: quizQuestions[counter].answers,
//       answer: "",
//     });
//   };

//   const getResults = () => {
//     const answersCount = quizObj.answersCount;
//     const answersCountKeys = Object.keys(answersCount);
//     const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
//     const maxAnswerCount = Math.max.apply(null, answersCountValues);
//     console.log(
//       answersCount,
//       answersCountKeys,
//       answersCountValues,
//       maxAnswerCount
//     );
//     return answersCountKeys.filter(
//       (key) => answersCount[key] === maxAnswerCount
//     );
//   };

//   const setResults = (result) => {
//     console.log("result", result);
//     if (result.length === 1) {
//       setQuizObj({ ...quizObj, result: result[0] });
//     } else {
//       setQuizObj({ ...quizObj, result: "Undetermined" });
//     }
//   };

//   const renderQuiz = () => {
//     return (
//       <Quiz
//         answer={quizObj.answer}
//         answerOptions={quizObj.answerOptions}
//         questionId={quizObj.questionId}
//         question={quizObj.question}
//         questionTotal={quizQuestions.length}
//         onAnswerSelected={handleAnswerSelected}
//       />
//     );
//   };
//   const renderResult = () => {
//     return <Result handleSubmit={handleSubmit} quizResult={quizObj.result} />;
//   };

//   return (
//     <div>
//       <h6>Let us help you reach you goal!</h6>
//       <h4> Simply answer 6 questions below to get started!</h4>
//       {quizObj.result ? renderResult() : renderQuiz()}
//     </div>
//   );
// };

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: "",
      answerOptions: [],
      answer: "",
      answersCount: {},
      result: "",
    };

    //this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentDidMount() {
    const shuffledAnswerOptions = quizQuestions.map((question) =>
      this.shuffleArray(question.answers)
    );
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0],
    });
  }

  handleSubmit = () => {
    this.props.handleSubmit(this.state.answerOptions);
  };

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleAnswerSelected = (event) => {
    this.setUserAnswer(event.currentTarget.value);

    if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  };

  setUserAnswer(answer) {
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1,
      },
      answer: answer,
    }));
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: "",
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(
      (key) => answersCount[key] === maxAnswerCount
    );
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: "Undetermined" });
    }
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return (
      <Result handleSubmit={this.handleSubmit} quizResult={this.state.result} />
    );
  }

  render() {
    return (
      <div>{this.state.result ? this.renderResult() : this.renderQuiz()}</div>
    );
  }
}

export default App;
