<script runat="server">
Platform.Load("core", "1.1.1");

try {
    // Initialize WSProxy
    var prox = new Script.Util.WSProxy();

    // Set up the filter criteria
    var cols = ["Name", "CustomerKey", "QueryText", "CreatedDate", "ModifiedDate"];
    var filter = {
        Property: "QueryText",
        SimpleOperator: "LIKE",
        Value: "%0lc5Y000000fz0qQAA%"
    };

    // Perform the retrieve operation
    var result = prox.retrieve("QueryDefinition", cols, filter);

    // Check if there are results
    if (result.Results && result.Results.length > 0) {
        Write("<h2>Queries containing '0lc5Y000000fz0qQAA':</h2>");
        Write("<table border='1'><tr><th>Name</th><th>CustomerKey</th><th>QueryText</th><th>Created Date</th><th>Modified Date</th></tr>");

        // Loop through the results and output them
        for (var i = 0; i < result.Results.length; i++) {
            var query = result.Results[i];
            Write("<tr>");
            Write("<td>" + query.Name + "</td>");
            Write("<td>" + query.CustomerKey + "</td>");
            Write("<td>" + query.QueryText + "</td>");
            Write("<td>" + query.CreatedDate + "</td>");
            Write("<td>" + query.ModifiedDate + "</td>");
            Write("</tr>");
        }

        Write("</table>");
        Write("<p>Total queries found: " + result.Results.length + "</p>");
    } else {
        Write("<p>No queries found containing '0lc5Y000000fz0qQAA'.</p>");
    }
} catch (ex) {
    Write("An error occurred: " + ex);
}
</script>
