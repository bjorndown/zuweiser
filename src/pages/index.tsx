import React, { useEffect, useMemo, useState } from 'react'
import { Activities } from '../components/Activities'
import {
    Participants,

} from '../components/Participants'
import { Results } from '../components/Results'
import {ActivitiesConfig, ParticipantsConfig} from '../core/model'
import { match, MatchResult } from '../core/matcher'
import { PriorityDistribution } from '../components/PriorityDistribution'
import { CapacityCheck } from '../components/CapacityCheck'
import { Message } from '../components/Message'

const Index = () => {
    const [activitiesConfig, setActivitiesConfig] = useState<
        ActivitiesConfig | undefined
    >()
    const [participantsConfig, setParticipantsConfig] = useState<
        ParticipantsConfig | undefined
    >()
    const [result, setResult] = useState<MatchResult | undefined>()
    const [error, setError] = useState<Error | undefined>()
    const ready = useMemo(
        () =>
            activitiesConfig?.activities?.length &&
            participantsConfig?.participants?.length,
        [activitiesConfig, participantsConfig]
    )

    useEffect(() => {
        setResult(undefined)
    }, [activitiesConfig, participantsConfig])

    const compute = () => {
        try {
            setResult(match(participantsConfig, activitiesConfig))
        } catch (error) {
            console.error(error)
            setError(error)
        }
    }

    return (
        <>
            <h1>Zuweiser</h1>
            <div id="config">
                <Activities
                    onChange={(activitiesConfig) => {
                        setError(undefined)
                        setActivitiesConfig(activitiesConfig)
                    }}
                />
                <Participants
                    onChange={(config) => {
                        setError(undefined)
                        setParticipantsConfig(config)
                    }}
                />
            </div>
            {ready && (
                <>
                    <PriorityDistribution
                        participantsConfig={participantsConfig}
                        activitiesConfig={activitiesConfig}
                    />
                    <CapacityCheck
                        participantsConfig={participantsConfig}
                        activitiesConfig={activitiesConfig}
                    />
                    <button className="matchButton" onClick={compute}>
                        Prioritäten auflösen
                    </button>
                    {error && <Message type={'bad'}>{error.message}</Message>}
                </>
            )}
            {result && (
                <Results result={result} participantsConfig={participantsConfig} />
            )}

            <style jsx>{`
                @media screen and (min-width: 500px) {
                    #config {
                        flex-flow: column wrap;
                    }
                }

                #config {
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: flex-start;
                    column-gap: 1rem;
                }

                .matchButton {
                    margin-top: 1rem;
                    padding: 0.5rem;
                    font-size: larger;
                }
            `}</style>
        </>
    )
}

export default Index
