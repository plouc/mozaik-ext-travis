import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Repository from '../../src/components/Repository'
import { WidgetLoader, WidgetHeader } from 'mozaik/ui'

const sampleOwner = 'plouc'
const sampleRepository = 'mozaik'

test('should return correct api request', t => {
    t.deepEqual(
        Repository.getApiRequest({
            owner: sampleOwner,
            repository: sampleRepository,
        }),
        {
            id: `travis.repository.${sampleOwner}.${sampleRepository}`,
            params: {
                owner: sampleOwner,
                repository: sampleRepository,
            },
        }
    )
})

test('should display loader if no apiData available', t => {
    const wrapper = shallow(<Repository owner={sampleOwner} repository={sampleRepository} />, {
        context: { theme: {} },
    })

    t.is(wrapper.find(WidgetLoader).length, 1)
})

test('should display owner/repo', t => {
    const wrapper = shallow(<Repository owner={sampleOwner} repository={sampleRepository} />, {
        context: { theme: {} },
    })

    const header = wrapper.find(WidgetHeader)
    t.is(header.length, 1)
    t.is(header.prop('title'), '')
    t.is(header.prop('subject'), `${sampleOwner}/${sampleRepository}`)
})

test('should allow title override', t => {
    const wrapper = shallow(
        <Repository owner={sampleOwner} repository={sampleRepository} title="override" />,
        { context: { theme: {} } }
    )

    const header = wrapper.find(WidgetHeader)
    t.is(header.length, 1)
    t.is(header.prop('title'), 'override')
    t.is(header.prop('subject'), null)
})

/*
test('should display info if apiData is available', t => {
    const repository = {
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
        github_language:        'JavaScript',
    }
    const wrapper = shallow(
        <Repository
            owner={sampleOwner}
            repository={sampleRepository}
            apiData={repository}
        />
    )


    t.is(wrapper.find('.travis__repository__slug').text(), `${sampleOwner}/${sampleRepository}`)
    t.is(wrapper.find('.widget__header__count').text(), `#${repository.last_build_number}`)

    const infoItems = wrapper.find('.list__item')
    t.is(infoItems.length, 3)
    t.is(infoItems.at(0).text().trim(), `last build ${repository.last_build_state}`)
    t.regex(infoItems.at(1).text(), new RegExp(`in ${repository.last_build_duration}s`))
    t.is(infoItems.at(2).text().trim(), `language: ${repository.github_language}`)
})
*/
