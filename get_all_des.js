<script runat="server">

    Platform.Load("core", "1");

    var api = new Script.Util.WSProxy();
	
	try {
        // add cols
        var cols = ["Name","CustomerKey","IsSendable"];

        var filter = {
            Property: "CustomerKey",
            SimpleOperator: "isNotNull",
            Value: " "
        };

        var opts = {
            BatchSize: 300
        };

        var props = {
            QueryAllAccounts: false
        };

        var result = [],
            moreData = true,
            reqID = data = null;

        while(moreData) {

            moreData = false;

            if(reqID) props.ContinueRequest = reqID;

            var req = api.retrieve("DataExtension", cols, filter, opts, props);

            if (req) {

                moreData = req.HasMoreRows;
                reqID = req.RequestID;

                var results = req.Results;

                for (var k in results) {
                    var name = results[k].Name;
                    if (name.indexOf("_") != 0) result.push(name);
                }

            }
        }

        Write(Stringify(result));
		
	} catch(error) {
        Write(Stringify(error));
    }	

</script>
