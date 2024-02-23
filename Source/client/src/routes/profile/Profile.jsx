export default function Profile() {
  return <div>
    <nb-card>
      <nb-card-header>Block form</nb-card-header>
      <nb-card-body>
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group">
              <label for="inputFirstName" class="label">First Name</label>
              <input type="text" nbInput fullWidth id="inputFirstName" placeholder="First Name"/>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label for="inputLastName" class="label">Last Name</label>
              <input type="text" nbInput fullWidth id="inputLastName" placeholder="Last Name"/>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group">
              <label for="inputEmail" class="label">Email</label>
              <input type="email" nbInput fullWidth id="inputEmail" placeholder="Email"/>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label for="inputWebsite" class="label">Website</label>
              <input type="text" nbInput fullWidth id="inputWebsite" placeholder="Website"/>
            </div>
          </div>
        </div>
        <button type="submit" nbButton>Submit</button>
      </nb-card-body>
    </nb-card>
  </div>;
}
