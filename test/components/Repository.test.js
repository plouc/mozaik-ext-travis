import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import { WidgetLoader, WidgetHeader, defaultTheme } from '@mozaik/ui'
import Repository from '../../src/components/Repository'

const sampleOwner = 'plouc'
const sampleRepository = 'mozaik'

it('should return correct api request', () => {
    expect(
        Repository.getApiRequest({
            owner: sampleOwner,
            repository: sampleRepository,
        })
    ).toEqual({
        id: `travis.repository.${sampleOwner}.${sampleRepository}`,
        params: {
            owner: sampleOwner,
            repository: sampleRepository,
        },
    })
})

it('should display loader if no apiData available', () => {
    const wrapper = shallow(
        <Repository owner={sampleOwner} repository={sampleRepository} theme={defaultTheme} />,
        {
            context: { theme: {} },
        }
    )

    expect(wrapper.find(WidgetLoader)).toHaveLength(1)
})

it('should display owner/repo', () => {
    const wrapper = shallow(
        <Repository owner={sampleOwner} repository={sampleRepository} theme={defaultTheme} />,
        {
            context: { theme: {} },
        }
    )

    const header = wrapper.find(WidgetHeader)
    expect(header).toHaveLength(1)
    expect(header.prop('title')).toBe('')
    expect(header.prop('subject')).toBe(`${sampleOwner}/${sampleRepository}`)
})

it('should allow title override', () => {
    const wrapper = shallow(
        <Repository
            owner={sampleOwner}
            repository={sampleRepository}
            title="override"
            theme={defaultTheme}
        />,
        { context: { theme: {} } }
    )

    const header = wrapper.find(WidgetHeader)
    expect(header).toHaveLength(1)
    expect(header.prop('title')).toBe('override')
    expect(header.prop('subject')).toBe(null)
})

it('should display info if apiData is available', () => {
    const apiData = {
        id: 3637580,
        slug: 'plouc/mozaik',
        description:
            'Mozaïk is a tool based on nodejs / reactjs to easily build beautiful dashboards',
        github_language: 'JavaScript',
        default_branch: {
            name: 'master',
        },
        last_build: {
            state: 'passed',
            number: '6',
            duration: 53,
            started_at: '2014-12-29T11:33:09Z',
            finished_at: '2014-12-29T11:34:02Z',
        },
    }

    const tree = renderer.create(
        <ThemeProvider theme={defaultTheme}>
            <Repository
                owner={sampleOwner}
                repository={sampleRepository}
                theme={defaultTheme}
                apiData={apiData}
            />
        </ThemeProvider>
    )

    expect(tree).toMatchSnapshot()
})
