import React from 'react'
import Enzyme from 'enzyme';
import {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import List from './example.js'
import ListBox from './example.js'
import PageButton from './example.js'
import Stars from './example.js'
import { expect } from 'chai';

describe('<List/>', function () {
    it('should have an image to display the food', function () {
        const wrapper = shallow(<List/>);
        expect(wrapper.find('img')).to.have.length(1);
    });
    it('should have props for idd, name, price and img', function () {
        const wrapper = shallow(<List/>);
        expect(wrapper.props().idd).to.be.defined;
        expect(wrapper.props().name).to.be.defined;
        expect(wrapper.props().price).to.be.defined;
        expect(wrapper.props().img).to.be.defined;
    });
});

describe('<ListBox/>', () => {
    it('contains an <List/> component', function () {
        const wrapper = mount(<List/>);
        expect(wrapper.find(List)).to.have.length(1);
    });
    it('contains an <PageButtom/> component', function () {
        const wrapper = mount(<PageButton/>);
        expect(wrapper.find(PageButton)).to.have.length(1);

    });
    it('should have props for indexList, totalData, current, pageSize, goValue, totalPage', function () {
        const wrapper = shallow(<List/>);
        expect(wrapper.props().indexList).to.be.defined;
        expect(wrapper.props().totalData).to.be.defined;
        expect(wrapper.props().current).to.be.defined;
        expect(wrapper.props().pageSize).to.be.defined;
        expect(wrapper.props().goValue).to.be.defined;
        expect(wrapper.props().totalPage).to.be.defined;
    });
});

describe('<PageButton/>', function () {
    it('should have 2 buttons', function () {
        const wrapper = shallow(<PageButton/>);
        expect(wrapper.find('button')).to.have.length(2);
    });
    it('should have props for num and pagenum', function () {
        const wrapper = shallow(<PageButton/>);
        expect(wrapper.props().num).to.be.defined;
        expect(wrapper.props().pagenum).to.be.defined;
    });
});

describe('<Stars/>', function () {
    it('should have props for num, tempnum, statistic and clicknum', function () {
        const wrapper = shallow(<Stars/>);
        expect(wrapper.props().num).to.be.defined;
        expect(wrapper.props().tempnum).to.be.defined;
        expect(wrapper.props().statistic).to.be.defined;
        expect(wrapper.props().clicknum).to.be.defined;
    });
    it('contains 5 <Star/> components', function () {
        const wrapper = mount(<Star/>);
        expect(wrapper.find(List)).to.have.length(5);
    });
});

