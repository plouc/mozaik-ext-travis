import React        from 'react/addons';
const { TestUtils } = React.addons;
import { expect }   from 'chai';
import sinon        from 'sinon';
import mockery      from 'mockery';


var Repository;
var repository;


describe('Travis — Repository', () => {

    let sandbox;

    before(() => {
        mockery.enable({ useCleanCache: true });
        mockery.warnOnUnregistered(false);
        mockery.registerMock('mozaik/browser', {
            Mixin: { ApiConsumer: {} }
        });

        Repository = require('./../components/Repository.jsx');
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        repository = TestUtils.renderIntoDocument(<Repository owner="plouc" repository="mozaik" />);
    });

    afterEach(() => {
        sandbox.restore();
    });

    after(() => {
        mockery.deregisterMock('mozaik/browser');
        mockery.disable();
    });


    it('should return correct api request', () => {
        expect(repository.getApiRequest()).to.eql({
            id:     'travis.repository.plouc.mozaik',
            params: {
                owner:      'plouc',
                repository: 'mozaik'
            }
        });
    });


    it('should display repository info', () => {
        let repoSlug = TestUtils.findRenderedDOMComponentWithClass(repository, 'travis__repository__slug');
        expect(repoSlug.getDOMNode().textContent).to.equal('');

        let repoBuildNumber = TestUtils.findRenderedDOMComponentWithClass(repository, 'widget__header__count');
        expect(repoBuildNumber.getDOMNode().textContent).to.equal('');

        repository.setState({
            repository: {
                id:                     3637580,
                slug:                   'plouc/mozaik',
                description:            'Mozaïk is a tool based on nodejs / reactjs to easily build beautiful dashboards',
                last_build_id:          45344564,
                last_build_number:      '6',
                last_build_state:       'passed',
                last_build_duration:    53,
                last_build_language:    null,
                last_build_started_at:  '2014-12-29T11:33:09Z',
                last_build_finished_at: '2014-12-29T11:34:02Z',
                github_language:        'JavaScript'
            }
        });

        expect(repoSlug.getDOMNode().textContent).to.equal('plouc/mozaik');
        expect(repoBuildNumber.getDOMNode().textContent).to.equal('#6');


        let infos = TestUtils.scryRenderedDOMComponentsWithClass(repository, 'list__item');

        expect(infos.length).to.equal(3);

        expect(infos[0].getDOMNode().textContent).to.contain('last build passed');
        expect(infos[1].getDOMNode().textContent).to.contain('in 53s');
        expect(infos[2].getDOMNode().textContent).to.contain('language: JavaScript');
    });
});
