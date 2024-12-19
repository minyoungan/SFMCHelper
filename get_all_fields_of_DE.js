// fix requestId to get next batch. it get timed out after more than 100
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
            BatchSize: 100
        };

        var props = {
            QueryAllAccounts: false
        };

        var result = [],
            moreData = true,
            reqID = data = null;

            moreData = false;
   // set request id manually for next request
            if(reqID) props.ContinueRequest = "432edaac-33ab-4ad7-945f-fb097c9b35f8";

            var req = api.retrieve("DataExtension", cols, filter, opts, props);
  Write(Stringify(req));
            if (req) {

                moreData = req.HasMoreRows;
                reqID = req.RequestID;

                var results = req.Results;
            if (reqID) {
                Write("<br>Request ID: " + reqID + "<br>");
                props.ContinueRequest = reqID;
            }
                for (var k in results) {
                    var name = results[k].Name;
      var CustomerKey = results[k].CustomerKey;



         var customerKey = CustomerKey;

        var de = DataExtension.Init(customerKey);

        var result = de.Fields.Retrieve();

        Write(Stringify(result));


                    if (name.indexOf("_") != 0) result.push(name);
                }

            }

        Write(Stringify(result));
  
 } catch(error) {
        Write(Stringify(error));
    } 

</script>
