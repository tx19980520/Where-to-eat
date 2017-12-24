import React from 'react'
import Enzyme from 'enzyme';
import {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import MenuList from '../src/example.js'
import ListBox from '../src/example.js'
import PageButton from '../src/example.js'
import Stars from '../src/example.js'
import { expect } from 'chai';
import {Switch,Route,Link} from 'react-router-dom'
import StarShow from '../src/example.js'
import CommentList from '../src/example.js'
import Detail from  '../src/example.js'

configure({ adapter: new Adapter() });

describe('<MenuList/>', function () {
    it('should have an image to display the food', function () {
        const wrapper = shallow(<MenuList/>);
        expect(<img/>).to.be.exist;
    });

});

describe('<ListBox/>', () => {
});

describe('<PageButton/>', function () {
    it('should have 2 buttons', function () {
        const wrapper = shallow(<PageButton/>);
        expect(<button/>).to.be.exist;
    });

});

describe('<Stars/>', function () {
    it('should operate correctly',function(){
        const wrapper = shallow(<Stars/>);
        expect(StarShow())
    });
});

describe('<CommentList/>', function () {
    it('should have one <h4/> components', () => {
        const app = shallow(<CommentList />)
        expect(app.find('h4').length).to.equal(0);
    });
});

describe('Detail', function () {
    it('should have one <img/> components', () => {
        const app = shallow(<Detail/>)
        expect(app.find('img').length).to.equal(0);
    });
    it('should have one <Stars/> components', () => {
        const app = shallow(<Detail/>)
        expect(app.find('Stars').length).to.equal(0);
    });
    it('should have one <ReviewModel /> components', () => {
        const app = shallow(<Detail/>)
        expect(app.find('ReviewModel').length).to.equal(0);
    });
});

