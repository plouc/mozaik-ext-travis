import React from 'react'
import { shallow } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import renderer from 'react-test-renderer'
import { WidgetLoader, WidgetHeader, defaultTheme } from '@mozaik/ui'
import BuildHistory from '../../src/components/BuildHistory'
import BuildHistoryItem from '../../src/components/BuildHistoryItem'
import builds from '../fixtures/builds'

const owner = 'plouc'
const repository = 'mozaik'

jest.mock('moment', () => () => ({ fromNow: () => '2 days ago' }))

describe('getApiRequest', () => {
    it('should return correct api request', () => {
        expect(
            BuildHistory.getApiRequest({
                owner,
                repository,
            })
        ).toEqual({
            id: `travis.repositoryBuildHistory.${owner}.${repository}.10`,
            params: {
                limit: 10,
                owner,
                repository,
            },
        })
    })

    it('should support custom limit', () => {
        expect(
            BuildHistory.getApiRequest({
                owner,
                repository,
                limit: 35,
            })
        ).toEqual({
            id: `travis.repositoryBuildHistory.${owner}.${repository}.35`,
            params: {
                limit: 35,
                owner,
                repository,
            },
        })
    })
})

it('should display loader if no apiData available', () => {
    const wrapper = shallow(
        <BuildHistory owner={owner} repository={repository} theme={defaultTheme} />
    )

    expect(wrapper.find(WidgetLoader)).toHaveLength(1)
})

describe('title', () => {
    it('should display owner/repo by default', () => {
        const wrapper = shallow(
            <BuildHistory owner={owner} repository={repository} theme={defaultTheme} />
        )

        const header = wrapper.find(WidgetHeader)
        expect(header).toHaveLength(1)
        expect(header.prop('title')).toBe('builds')
        expect(header.prop('subject')).toEqual(`${owner}/${repository}`)
    })

    it('should allow title override', () => {
        const wrapper = shallow(
            <BuildHistory
                owner={owner}
                repository={repository}
                title="override"
                theme={defaultTheme}
            />
        )

        const header = wrapper.find(WidgetHeader)
        expect(header).toHaveLength(1)
        expect(header.prop('title')).toBe('override')
        expect(header.prop('subject')).toBe(null)
    })
})

it('should display builds info', () => {
    const wrapper = shallow(
        <BuildHistory
            owner={owner}
            repository={repository}
            theme={defaultTheme}
            apiData={{
                builds: {
                    items: builds,
                    pagination: { count: 10 },
                },
            }}
        />
    )

    const buildItems = wrapper.find(BuildHistoryItem)
    expect(buildItems).toHaveLength(builds.length)
})

it('should render as expected', () => {
    const tree = renderer.create(
        <ThemeProvider theme={defaultTheme}>
            <BuildHistory
                owner={owner}
                repository={repository}
                theme={defaultTheme}
                apiData={{
                    builds: {
                        items: builds,
                        pagination: { count: 10 },
                    },
                }}
            />
        </ThemeProvider>
    )

    expect(tree).toMatchSnapshot()
})
