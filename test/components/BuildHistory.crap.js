import test             from 'ava'
import React            from 'react'
import { shallow }      from 'enzyme'
import BuildHistoryItem from '../../src/components/BuildHistoryItem'
import BuildHistory     from '../../src/components/BuildHistory'


const sampleOwner      = 'plouc'
const sampleRepository = 'mozaik'
const sampleBuilds     = [
    {
        id: 2,
        number: '2',
        state: 'passed',
        duration: 10,
        finished_at: '2015-01-01T16:02:51Z',
        commit: {
            message: 'commit message 2'
        }
    },
    {
        id: 1,
        number: '1',
        state: 'passed',
        duration: 10,
        finished_at: '2015-01-01T16:02:51Z',
        commit: {
            message: 'commit message 1'
        }
    },
    {
        id: 0,
        number: '0',
        state: 'failed',
        duration: 10,
        finished_at: '2015-01-01T16:02:51Z',
        commit: {
            message: 'commit message 0'
        }
    }
]

test('should return correct api request', () => {
    expect(BuildHistory.getApiRequest({
        owner:      sampleOwner,
        repository: sampleRepository,
    })).toEqual({
        id:     `travis.buildHistory.${sampleOwner}.${sampleRepository}`,
        params: {
            owner:      sampleOwner,
            repository: sampleRepository
        }
    })
})


test('should display repository slug in header', t => {
    const wrapper = shallow(<BuildHistory owner={sampleOwner} repository={sampleRepository} />)

    t.is(wrapper.find('.widget__header').text(), `${sampleOwner}/${sampleRepository} build history`)
})


test('should display builds info', t => {
    const wrapper = shallow(
        <BuildHistory
            owner={sampleOwner}
            repository={sampleRepository}
            apiData={sampleBuilds}
        />
    )

    const builds = wrapper.find(BuildHistoryItem)
    t.is(builds.length, sampleBuilds.length)
})
