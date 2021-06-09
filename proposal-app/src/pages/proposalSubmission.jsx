import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

function ProposalSubmission() {
  const { register, handleSubmit } = useForm();
  let history = useHistory();
  const onSubmit = (data) => {
    console.log(data);
    axios({
      method: "post",
      url: "https://g14gr1ugze.execute-api.us-east-1.amazonaws.com/dev/proposalSubmission",
      data: data,
    });
    history.push("/submission");
  };

  return (
    <div
      className="container"
      style={{ padding: "80px 50px 50px 50px", align: "center" }}
    >
      <form
        id="upload_form"
        className="form-horizontal"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Proposal Submission Form</h2>
        <hr />
        <div
          id="Alert"
          className="alert alert-danger"
          style={{ display: "none" }}
        ></div>
        <div className="form-group">
          <label className="col-sm-3 control-label">Proposal Title:</label>
          <div className="col-sm-9">
            <input
              type="text"
              name="title"
              placeholder="Proposal Title"
              className="form-control"
              required
              {...register("title")}
            />
          </div>
        </div>
        <div className="form-group">
          <label for="EventDateFrom" className="col-sm-3 control-label">
            Event Date (From):
          </label>
          <div className="col-sm-3">
            <input
              type="date"
              name="EventDateFrom"
              className="form-control"
              {...register("EventDateFrom")}
            />
          </div>
          <label for="EventDateTo" className="col-sm-3 control-label">
            Event Date (To):
          </label>
          <div className="col-sm-3">
            <input
              type="date"
              name="EventDateTo"
              className="form-control"
              {...register("EventDateTo")}
            />
          </div>
        </div>
        <div className="form-group">
          <label for="amount" className="col-sm-3 control-label">
            Proposed Amount:
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              name="amount"
              placeholder="Proposed Amount"
              className="form-control"
              {...register("amount")}
            />
          </div>
        </div>
        <div className="form-group">
          <label for="country" className="col-sm-3 control-label">
            Type
          </label>
          <div className="col-sm-9">
            <select
              name="proposal_type"
              className="form-control"
              {...register("proposal_type")}
            >
              <option value="">Select</option>
              <option value="LC">Local Chapter</option>
              <option value="RC">Regional Conference</option>
              <option value="APS">APS Proposal</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label for="country" className="col-sm-3 control-label">
            Submission Type
          </label>
          <div className="col-sm-9">
            <select
              name="submit_type"
              className="form-control"
              {...register("submit_type")}
            >
              <option value="">Select</option>
              <option value="P">Prolosal</option>
              <option value="R">Report</option>
              <option value="A">Annual Plan Report</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-5 col-sm-offset-3">
            <input
              id="submit_type"
              name="submit_type"
              type="hidden"
              value="P"
            />
            <input
              type="submit"
              name="btnupload"
              value="Submit"
              className="btn btn-primary btn-block"
            />
            <br />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProposalSubmission;
