var my_news = [
	{
		author: 'Саша Печкин',
		text: 'В четчерг, четвертого числа...',
		bigText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, nisi!'
	},
	{
		author: 'Вася Пупкин',
		text: 'Считаю, что $ должен стоить 35 рублей!',
		bigText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, nisi!'
	},
	{
		author: 'Иванов Иван',
		text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3001',
		bigText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, nisi!'
	},
	{
		author: 'Петров Петя',
		text: 'Lorem ipsum dolor sit amet, consectetur.',
		bigText: 'Lorem ipsum dolor sit amet'
	}
];


var Article = React.createClass({
	propTypes: {
		data: React.PropTypes.shape({
			author: React.PropTypes.string.isRequired,
			text: React.PropTypes.string.isRequired,
			bigText: React.PropTypes.string.isRequired
		})
	},
	getInitialState: function () {
		return {
			visible: false
		};
	},
	readmoreClick: function (e) {
		e.preventDefault();
		this.setState({visible: true});
	},
	render: function () {
		var author = this.props.data.author,
			text = this.props.data.text,
			bigText = this.props.data.bigText,
			visible = this.state.visible;

		return (
			<div className='article'>
				<p className='news__author'>{author}:</p>
				<p className='news__text'>{text}</p>
				<a href="#"
					 onClick={this.readmoreClick}
					 className={'news__readmore ' + (visible ? 'none': '')}>
					Подробнее
				</a>
				<p className={'news__big-text ' + (visible ? '': 'none')}>{bigText}</p>
			</div>
		)
	}
});

var News = React.createClass({
	propTypes: {
		data: React.PropTypes.array.isRequired
	},
	getInitialState: function () {
		return {
			counter: 0
		}
	},
	render: function () {
		var data = this.props.data;
		var newsTemplate;

		if (data.length > 0) {
			newsTemplate = data.map(function (item, index) {
				return (
					<div key={index}>
						<Article data={item}/>
					</div>
				)
			})
		} else {
			newsTemplate = <p>К сожалению новостей нет</p>
		}

		return (
			<div className='news'>
				{newsTemplate}
				<strong
					className={'news__count ' + (data.length > 0 ? '':'none') }>Всего новостей: {data.length}</strong>
			</div>
		);
	}
});

var TestInput = React.createClass({
	onBtnClickHandler: function() {
		console.log(this.refs);
		alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);
	},
	render: function() {
		return (
			<div>
				<input
					className='test-input'
					defaultValue=''
					placeholder='введите значение'
					ref='myTestInput'
				/>
				<button onClick={this.onBtnClickHandler} ref='alert_button'>Показать alert</button>
			</div>
		);
	}
});

var App = React.createClass({
	render: function () {
		return (
			<div className='app'>
				<h3>Новости</h3>
				<TestInput /> {/* добавили вывод компонента */}
				<News data={my_news}/>
			</div>
		);
	}
});

ReactDOM.render(
	<App />,
	document.getElementById('root')
);