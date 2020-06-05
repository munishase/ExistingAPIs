import { Stitchdata } from '../Stitchdata'
import { StitchdataCreateAccount } from '../StitchdataCreateAccount';

export class StitchdataAccountCreationSuccessResponse extends StitchdataCreateAccount {
    access_token: string;
    stitch_account_id: string;

    constructor(stitchdata: Stitchdata, stitchdataCreateAccount: StitchdataCreateAccount) {
        super();
        this.access_token = stitchdata.Token;
        this.stitch_account_id = stitchdata.AccountId;
        this.FirstName = stitchdataCreateAccount.FirstName;
        this.LastName = stitchdataCreateAccount.LastName;
        this.Company = stitchdataCreateAccount.Company;
        this.Email = stitchdataCreateAccount.Email;
    }
}

