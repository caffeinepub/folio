import Text "mo:core/Text";



actor {
  let correctPIN = "3275";
  var portfolioJSON = "{\"hero\": \"Lancelot\"}";

  public query ({ caller }) func getPortfolio () : async Text {
    portfolioJSON;
  };

  public query ({ caller }) func checkPin (pin : Text) : async Bool {
    Text.equal(pin, correctPIN);
  };

  public shared ({ caller }) func savePortfolio (newPortfolio : Text, pin : Text) : async Bool {
    if (Text.equal(pin, correctPIN)) {
      portfolioJSON := newPortfolio;
      true;
    } else {
      false;
    };
  };
};
