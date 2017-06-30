/* jshint esversion:6, devel:true */


/* utility method for easy templating of repeating html elements
 * such as lists.
 *
 * 'tagged template literals' are strings that are first passed
 * through a custom function which returns the processed string.
 *
 * @params  [array]  literal     [array of all the literal secti
 * @params  [array]  ...cooked   [rest param: all the proccessed expressions]
 * @returns [string]             [the processed string]
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
const table_row = (profile) => html `
    <tr>
        <td>${profile.team_domain}</td>
        <td>${profile.user_name}</td>
        <td>${(profile.timestamp).slice(3,15)}</td>
        <td>${profile.skills.length}</td>
        <td>${profile.skills.join(', ')}</td>
    </tr>
`;


/* template that loops over the array of profiles adding a 'tr' for each
*/
const table_template = (data) => html `
    <table class="table">
        <thead>
            <th>Team</th>
            <th>Team Member</th>
            <th>Last Updated</th>
            <th>Total Skills</th>
            <th>Skills</th>
        </thead>
        <tbody>
            ${data.map( profile => table_row(profile) )}
        </tbody>
    </table>
`;

//console.log(table_template(temp_data));

export { table_template };
