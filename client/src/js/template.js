/* jshint esversion:6, devel:true */


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
const header_template = (team) => html`
    <header class="whapp-header">
        <h1>${team}</h1>
    </header>
`;


export {
    table_template,
    header_template
};
