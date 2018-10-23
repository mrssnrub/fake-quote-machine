import React from 'react';
import { FaTwitterSquare} from "react-icons/fa";

const authors = ["Stalin", "Kim Jong-Un", "Donald J. Trump", "Saddam Hussein", "Bill Clinton", "Hillary Clinton"];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


class Quote extends React.Component {
    constructor() {
        super();
        this.state = {
            quote: '',
            author: '',
        };

        this.getRandomQuote = this.getRandomQuote.bind(this);
    }

    componentWillMount() {
        this.fetchQuote();
    }

    fetchQuote() {
        fetch('https://talaikis.com/api/quotes/random/')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    quote: data.quote,
                    author: authors[getRandomInt(authors.length)],
                });
            });
    }

    getRandomQuote = (event) => {
        this.fetchQuote();
    };

    render() {
        const quoteForTweet = encodeURIComponent(`${this.state.quote} - ${this.state.author}`);
        return (
            <div className="container text-center" id="quote-box">
                <h1>Quote of the day</h1>
                <p id="text">"{this.state.quote}"</p>
                <p id="author">-{this.state.author}</p>
                <div className="row">
                    <div className="col-lg-6">
                <button class="btn btn-light" id="new-quote" onClick={this.getRandomQuote}>New Quote</button>
                    </div>
                    <div className="col-lg-6">
                        <button id="tweet-quote" class="btn bth-light">
                            <a className="twitter-share-button"
                               href={`https://twitter.com/intent/tweet?text=${quoteForTweet}`}>
                                Tweet</a>
                            <FaTwitterSquare size="15px" color="white"/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Quote;