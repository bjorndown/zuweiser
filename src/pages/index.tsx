import React, { useMemo, useState } from 'react'
import { Activities } from '../components/Activities'
import {
    Participants,
    ParticipantsConfigWithData
} from '../components/Participants'
import { Results } from '../components/Results'
import { ActivitiesConfig } from '../core/model'
import { match, MatchResult } from '../core/matcher'

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
            <Activities onChange={setActivitiesConfig} />
            <Participants onChange={setParticipantsConfig} />
            {ready && <button onClick={compute}>Prioritäten auflösen</button>}
            {result && (
                <Results result={result} participantsData={participantsData} />
            )}

            <style jsx>{`
                label {
                    margin-right: 1em;
                }

                select {
                    margin-bottom: 0.6em;
                }

                #sheet-config {
                    display: grid;
                    grid-area: config;
                    grid-template-columns: 450px auto;
                    grid-template-areas:
                        'header header'
                        'activities  participants';
                }

                #config-header {
                    grid-area: header;
                }

                #config-activities {
                    grid-area: activities;
                }

                #config-participants {
                    grid-area: participants;
                }
            `}</style>
        </>
    )
}

export default Index
