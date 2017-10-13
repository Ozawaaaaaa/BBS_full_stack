import React, {Component} from 'react'
import Carousel from 'react-bootstrap/lib/Carousel';
import './Carousel.css'
// import $ from 'jquery';

export default class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			direction: null
		};
		this.pictures = [
			'https://www.wpi.edu/sites/default/files/styles/w_768/public/2017/09/29/albania_homepage.jpg',
			'http://pa-hrsuite-production.s3.amazonaws.com/1582/docs/86660.jpg',
			'http://www.wbjournal.com/storyimage/WB/20170606/NEWS01/170609967/AR/0/AR-170609967.jpg&MaxH=500&MaxW=620'
		];
		this.interval = null;
		this.handleSelect = this.handleSelect.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.componentWillUnmount = this.componentWillUnmount.bind(this);
		this.automate = this.automate.bind(this);
	}

	handleSelect(selectedIndex, e) {
		this.setState({
			index: selectedIndex,
			direction: e.direction
		});
		clearInterval(this.interval);
		this.interval = setInterval(this.automate, 5000)
	}

	automate() {
		if (this.state.index >= this.pictures.length - 1)
			this.setState({index: 0});
		else
			this.setState({index: this.state.index + 1});
	}

	componentDidMount() {
		this.interval = setInterval(this.automate, 5000)
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		return (
			<Carousel id="headCarousel" activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
				<Carousel.Item>
					<img className="img-responsive img-thumbnail" alt="900x500" src={this.pictures[0]}/>
					<Carousel.Caption>
						<h3>CS 4241</h3>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img className="img-responsive img-thumbnail" alt="900x500" src={this.pictures[1]}/>
					<Carousel.Caption>
						<h3>CS 4241</h3>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img className="img-responsive img-thumbnail" alt="900x500" src={this.pictures[2]}/>
					<Carousel.Caption>
						<h3>CS 4241</h3>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
		);
	}
}
