/* jshint esversion:6, devel:true */


const rightNow = (new Date()).toString().slice(3, 15);


/* utility method for easy templating of repeating html elements
 *
 * @params  [array]  literalsArr   [array of all the literal secti
 * @params  [array]  ...cooked     [rest param: all the proccessed expressions]
 * @returns [string]               [the processed string]
 */
const html = (literalsArr, ...cooked) => {
    let result = '';

    cooked.forEach((cook, i) => {
        let lit = literalsArr[i];
        if (Array.isArray(cook)) {
            cook = cook.join('');
        }
        result += lit;
        result += cook;
    });
    result += literalsArr[literalsArr.length - 1];
    return result;
};


/* template that returns a 'tr'
*/
const table_row = (skill) => html `
    <tr>
        <td>${skill.skill}</td>
        <td>${skill.count}</td>
    </tr>
`;


/* template that loops over the array of profiles adding a 'tr' for each
*/
const table_template = (data) => html `
    <table class="whapp-table">
        <thead>
            <th>Skill</th>
            <th>Count</th>
        </thead>
        <tbody>
            ${data.map( skill => table_row(skill) )}
        </tbody>
    </table>
`;


/* template that generates page header
*/
const title_template = (team) => html`
    <header class="whapp-header">
        <h1>${team} skills as of ${rightNow}</h1>
    </header>
`;


/* template that generates the footer
*/
const footer_template = (config) => html`
    <p class="footer-credit"> ${config.desc} : v${config.version} : by 
        <a href="${config.link}" target="_blank">belcurv</a>
        <a href="${config.link}" target="_blank">
            <svg width="20" height="20" class="github-icon" viewBox="0 0 16 16" version="1.1" aria-hidden="true">
                <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"> </path>
            </svg>
        </a>
    </p>
    <p class="footer-credit">Source released under the MIT license. Website and documentation licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a></p>
`;


export {
    table_template,
    title_template,
    footer_template
};
