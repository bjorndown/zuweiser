import React, { useMemo, useState } from 'react'
import { Activities } from '../components/Activities'
import {
    Participants,
    ParticipantsConfigWithData
} from '../components/Participants'
import { Results } from '../components/Results'
import { ActivitiesConfig } from '../core/model'
import { match, MatchResult } from '../core/matcher'
import { PriorityDistribution } from '../components/PriorityDistribution'

const Index = () => {
    const [activitiesConfig, setActivitiesConfig] = useState<
        ActivitiesConfig | undefined
    >()
    const [participantsConfig, setParticipantsConfig] = useState<
        ParticipantsConfigWithData | undefined
    >()
    const [result, setResult] = useState<MatchResult | undefined>()
    const ready = useMemo(
        () => activitiesConfig && participantsConfig,
        [activitiesConfig, participantsConfig]
    )

    const participantsData = useMemo(
        () =>
            Object.fromEntries(
                participantsConfig?.participantsData.map((participantsData) => [
                    participantsData.id,
                    participantsData.data
                ]) ?? []
            ),
        [participantsConfig]
    )

    const compute = () => {
        setResult(match(participantsConfig, activitiesConfig))
    }

    return (
        <>
            <h1>Zuweiser</h1>
            <div id="config">
                <Activities onChange={setActivitiesConfig} />
                <Participants onChange={setParticipantsConfig} />
            </div>
            {ready && (
                <>
                    <PriorityDistribution
                        participantsConfig={participantsConfig}
                        activitiesConfig={activitiesConfig}
                    />
                    <button className="matchButton" onClick={compute}>
                        Prioritäten auflösen
                    </button>
                </>
            )}
            {result && (
                <Results result={result} participantsData={participantsData} />
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
