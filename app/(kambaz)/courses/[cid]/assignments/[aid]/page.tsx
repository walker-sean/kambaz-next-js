export default function AssignmentEditor() {


  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online. Submit a link to the landing page of your Web application running on Vercel.
        The landing page should be the Kambaz application with a link to the Lab exercises.
        Lab 1 should be the landing page of the Lab exercises and should include the following:
        Your full name and section
        Links to each of the lab assignments
        Link to the Kambaz application
        Links to all relevant source code repositories
        The Kambaz application should include a link to navigate back to the landing page.
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
          </td>
        </tr>
      </table>
      <br />
      <label htmlFor="wd-assignment-group">Assignment Group</label>
      <select id="wd-assignment-group" defaultValue="ASSIGNMENTS">
        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
      </select>
      <br />
      <label htmlFor="wd-display-type">Display Grade as</label>
      <select id="wd-display-type" defaultValue="PERCENTATGE">
        <option value="PERCENTAGE">Percentage</option>
        <option value="RAW_TOTAL">Raw Total</option>
        <option value="FRACTION">Fraction</option>
      </select>
      <br />
      <label htmlFor="wd-submission-type">Submission Type</label>
      <select id="wd-submission-type" defaultValue="ONLINE">
        <option value="ONLINE">Online</option>
        <option value="IN_PERSON">In person</option>
      </select>
      <br />
      <label htmlFor="wd-entry-options">Online Entry Options</label>
      <br />
      <input type="checkbox" name="wd-entry-options" id="wd-text-entry"/>
      <label htmlFor="wd-text-entry">Text Entry</label>
      <br />
      <input type="checkbox" name="wd-entry-options" id="wd-website-url"/>
      <label htmlFor="wd-website-url">Website URL</label>
      <br />
      <input type="checkbox" name="wd-entry-options" id="wd-media-recordings"/>
      <label htmlFor="wd-media-recordings">Media Recordings</label>
      <br />
      <input type="checkbox" name="wd-entry-options" id="wd-student-annotation"/>
      <label htmlFor="wd-student-annotation">Student Annotation</label>
      <br />
      <input type="checkbox" name="wd-entry-options" id="wd-file-uploads"/>
      <label htmlFor="wd-file-uploads">File Uploads</label>
      <br /> <br />
      <label htmlFor="wd-assign-to">Assign To</label>
      <br />
      <input type="text" id="wd-assign-to" defaultValue="Everyone" />
      <br />
      <label htmlFor="wd-due">Due</label>
      <br />
      <input type="date" id="wd-due" defaultValue="2026-05-13" />
      <br />
      <table>
        <tr>
          <td><label htmlFor="wd-available-from">Available From</label></td>
          <td><label htmlFor="wd-until">Until</label></td>
        </tr>
        <tr>
          <td><input type="date" id="wd-available-from" defaultValue='2026-05-06'/></td>
          <td><input type="date" id="wd-until" defaultValue='2026-05-20'/></td>
        </tr>
      </table>
    </div>
);}