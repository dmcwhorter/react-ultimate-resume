import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';
import isArray from 'lodash.isarray';
import mergeWith from 'lodash.mergewith';
import omit from 'lodash.omit';
import cloneDeep from 'lodash.clonedeep';
import download from 'downloadjs';
import { Button } from '@welovedevs/ui';

import Resume from './data/resume.json';
import DeveloperProfile from './package';
import { ReactComponent as SaveIcon } from './package/assets/icons/drop_file.svg';
import { ReactComponent as EmailIcon } from './package/assets/icons/email.svg';
import { ReactComponent as LinkedInIcon } from './package/assets/icons/brands/linkedin.svg';
import { ReactComponent as TwitterIcon } from './package/assets/icons/brands/twitter.svg';
import { ReactComponent as GithubIcon } from './package/assets/icons/brands/github.svg';

import { styles } from './app_styles';

const useStyles = createUseStyles(styles);
const mergeFunction = (objValue, srcValue) => {
    if (!objValue || isArray(objValue)) {
        return srcValue;
    }
    return undefined;
};

const mode = process.env.REACT_APP_MODE || 'edit';

function App() {
    const classes = useStyles();
    const [data, setData] = useState(omit(Resume, 'resumeCustomization'));

    const onEdit = useCallback((newData) => setData(mergeWith(cloneDeep(data), newData, mergeFunction)), [
        JSON.stringify(data)
    ]);
    const [customization, setCustomization] = useState(Resume.resumeCustomization || {});

    const onCustomizationChanged = useCallback(setCustomization, [data]);

    const handleClick = useCallback(async () => {
        // eslint-disable-next-line no-undef
        const blob = new Blob([JSON.stringify({ ...data, resumeCustomization: customization })], {
            type: 'text/plain; charset=utf-8'
        });
        download(
            blob,
            `${`Resume-${data?.basics?.name || 'Developer'}`.replace(' ', '-')}.json`,
            'text/plain; charset=utf-8'
        );
    }, [JSON.stringify(data), JSON.stringify(customization)]);

    return (
        <DeveloperProfile
            mode={mode}
            data={data}
            onEdit={onEdit}
            onCustomizationChanged={onCustomizationChanged}
            options={{
                locale: 'en',
                // side: 'back',
                apiKeys: {
                    giphy: process.env.REACT_APP_GIPHY
                },
                endpoints: {
                    devicons:
                        'https://firebasestorage.googleapis.com/v0/b/jechercheundev.appspot.com/o/technologies%2Ftechnologies_list.json?alt=media&token=459028ba-d9bc-4480-a3c4-88633afab7e2'
                },
                dismissFooter: true,
                showContactInfos: false,
                maxSkills: 30,
                customization,
                disableSortableExperience: false,
                maxCardsPerRow: 3
            }}
            additionalNodes={{
                banner: {
                    actionsButtons: mode === 'edit' && [
                        <Button variant="outlined" onClick={handleClick} color={'light'}>
                            <SaveIcon className={classes.saveIcon} />
                            <FormattedMessage id="Profile.header.jsonResume.download" defaultMessage="Export" />
                        </Button>
                    ],
                    userInformations: [
                        <Button variant="outlined" href="https://github.com/dmcwhorter" color={'light'}>
                            <GithubIcon />
                        </Button>,
                        <div style={{ 'white-space': 'nowrap' }} fill="light" stroke="light">
                            <a href="https://github.com/dmcwhorter" target="_blank">
                                <svg
                                    //class="svg-social"
                                    color="light"
                                    height="24px"
                                    width="24px"
                                    //enable-background="new -3 -3 42.72 43.72"
                                    version="1.1"
                                    viewBox="-3 -3 42.72 43.72"
                                    x="0px"
                                    xmlns="http://www.w3.org/2000/svg"
                                    y="0px"
                                >
                                    <g transform="translate(-282.49527,-458.21718)">
                                        <path d="m 302.85527,458.21718 c -11.24375,0 -20.36,9.11625 -20.36,20.3625 0,8.99625 5.83375,16.6275 13.925,19.32125 1.01875,0.18625 1.39,-0.4425 1.39,-0.9825 0,-0.4825 -0.0175,-1.76375 -0.0275,-3.4625 -5.66375,1.23 -6.85875,-2.73 -6.85875,-2.73 -0.92625,-2.3525 -2.26125,-2.97875 -2.26125,-2.97875 -1.84875,-1.2625 0.14,-1.2375 0.14,-1.2375 2.04375,0.14375 3.11875,2.09875 3.11875,2.09875 1.81625,3.11125 4.76625,2.2125 5.92625,1.69125 0.185,-1.315 0.71,-2.2125 1.2925,-2.72125 -4.52125,-0.51375 -9.275,-2.26125 -9.275,-10.06375 0,-2.2225 0.79375,-4.04 2.09625,-5.46375 -0.21,-0.515 -0.90875,-2.585 0.19875,-5.38875 0,0 1.71,-0.5475 5.6,2.0875 1.62375,-0.4525 3.36625,-0.6775 5.0975,-0.685 1.72875,0.007 3.47125,0.2325 5.0975,0.685 3.8875,-2.635 5.59375,-2.0875 5.59375,-2.0875 1.11125,2.80375 0.4125,4.87375 0.2025,5.38875 1.305,1.42375 2.09375,3.24125 2.09375,5.46375 0,7.8225 -4.76125,9.54375 -9.2975,10.0475 0.73125,0.62875 1.3825,1.87125 1.3825,3.77125 0,2.72125 -0.025,4.9175 -0.025,5.585 0,0.545 0.36625,1.17875 1.4,0.98 8.085,-2.69875 13.91375,-10.325 13.91375,-19.31875 0,-11.24625 -9.1175,-20.3625 -20.36375,-20.3625" />
                                        <rect height="12.484" width="4.151" x="18.762" y="26.734" />
                                    </g>
                                </svg>
                            </a>
                            <a href="http://www.linkedin.com/in/davidmcwhorter05" target="_blank">
                                <svg
                                    color="light"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    height="24px"
                                    width="24px"
                                    enable-background="new 0 0 56.693 56.693"
                                    version="1.1"
                                    viewBox="0 0 56.693 56.693"
                                    x="0px"
                                    xmlns="http://www.w3.org/2000/svg"
                                    y="0px"
                                >
                                    <g>
                                        <path d="M28.347,5.155c-13.6,0-24.625,11.025-24.625,24.625c0,13.602,11.025,24.625,24.625,24.625   c13.598,0,24.623-11.023,24.623-24.625C52.97,16.181,41.944,5.155,28.347,5.155z M42.062,41.741c0,1.096-0.91,1.982-2.031,1.982   H16.613c-1.123,0-2.031-0.887-2.031-1.982V18.052c0-1.094,0.908-1.982,2.031-1.982H40.03c1.121,0,2.031,0.889,2.031,1.982V41.741z" />
                                        <path d="M33.099,26.441c-2.201,0-3.188,1.209-3.74,2.061v0.041h-0.027c0.01-0.012,0.02-0.027,0.027-0.041v-1.768h-4.15   c0.055,1.17,0,12.484,0,12.484h4.15v-6.973c0-0.375,0.027-0.744,0.137-1.012c0.301-0.744,0.984-1.52,2.129-1.52   c1.504,0,2.104,1.146,2.104,2.824v6.68h4.15V32.06C37.878,28.224,35.829,26.441,33.099,26.441z" />
                                        <path d="M20.864,20.712c-1.419,0-2.349,0.934-2.349,2.159c0,1.197,0.9,2.158,2.294,2.158h0.027c1.447,0,2.348-0.961,2.348-2.158   C23.157,21.646,22.284,20.712,20.864,20.712z" />
                                        <rect height="12.484" width="4.151" x="18.762" y="26.734" />
                                    </g>
                                </svg>
                            </a>
                            <a href="http://twitter.com/DavidMcWhorter" target="_blank">
                                <svg
                                    color="light"
                                    height="24px"
                                    width="24px"
                                    enable-background="new 0 0 56.693 56.693"
                                    version="1.1"
                                    viewBox="0 0 56.693 56.693"
                                    x="0px"
                                    xmlns="http://www.w3.org/2000/svg"
                                    y="0px"
                                >
                                    <path d="M28.348,5.157c-13.6,0-24.625,11.027-24.625,24.625c0,13.6,11.025,24.623,24.625,24.623c13.6,0,24.623-11.023,24.623-24.623  C52.971,16.184,41.947,5.157,28.348,5.157z M40.752,24.817c0.013,0.266,0.018,0.533,0.018,0.803c0,8.201-6.242,17.656-17.656,17.656  c-3.504,0-6.767-1.027-9.513-2.787c0.486,0.057,0.979,0.086,1.48,0.086c2.908,0,5.584-0.992,7.707-2.656  c-2.715-0.051-5.006-1.846-5.796-4.311c0.378,0.074,0.767,0.111,1.167,0.111c0.566,0,1.114-0.074,1.635-0.217  c-2.84-0.57-4.979-3.08-4.979-6.084c0-0.027,0-0.053,0.001-0.08c0.836,0.465,1.793,0.744,2.811,0.777  c-1.666-1.115-2.761-3.012-2.761-5.166c0-1.137,0.306-2.204,0.84-3.12c3.061,3.754,7.634,6.225,12.792,6.483  c-0.106-0.453-0.161-0.928-0.161-1.414c0-3.426,2.778-6.205,6.206-6.205c1.785,0,3.397,0.754,4.529,1.959  c1.414-0.277,2.742-0.795,3.941-1.506c-0.465,1.45-1.448,2.666-2.73,3.433c1.257-0.15,2.453-0.484,3.565-0.977  C43.018,22.849,41.965,23.942,40.752,24.817z" />
                                </svg>
                            </a>
                            <a href="mailto:david@mcwhorter.io" target="_blank">
                                <svg
                                    color="light"
                                    height="24px"
                                    width="24px"
                                    version="1.1"
                                    viewBox="-1 -1 53 53"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ 'margin-left': '1px' }}
                                >
                                    <title />
                                    <defs />
                                    <g fill-rule="evenodd" stroke="none" stroke-width="1">
                                        <g class="icon-outer" transform="translate(-420.000000, -560.000000)">
                                            <circle
                                                cx="446"
                                                cy="586"
                                                d="M446,612 C460.359404,612 472,600.359404 472,586 C472,571.640596 460.359404,560 446,560 C431.640596,560 420,571.640596 420,586 C420,600.359404 431.640596,612 446,612 Z M446,612"
                                                r="26"
                                            />
                                        </g>
                                        <g class="icon-inner" transform="translate(-410.000000, -549.000000)">
                                            <path d="M436,578 L451,565 L421,565 L436,578 Z M431.948486,576.560913 L436,579.886475 L439.988037,576.560913 L451,586 L421,586 L431.948486,576.560913 Z M420,585 L420,566 L431,575.5 L420,585 Z M452,585 L452,566 L441,575.5 L452,585 Z M452,585" />
                                        </g>
                                    </g>
                                </svg>
                            </a>
                        </div>
                    ]
                }
            }}
        />
    );
}

export default App;
