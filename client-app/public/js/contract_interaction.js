/**
 * Created by milenradkov on 8.03.18.
 */
$(document).ready(function () {
  let peerToPeerLendingContract = "0x655Dc13D8E8b3B4fC5b822d9a23648AD69eB2D28";
  let peerToPeerLendingContractABI = [
    {
      constant: true,
      inputs: [{ name: "", type: "uint256" }],
      name: "credits",
      outputs: [{ name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getUserCredits",
      outputs: [{ name: "", type: "address[]" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "_credit", type: "address" }],
      name: "changeCreditState",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getCredits",
      outputs: [{ name: "", type: "address[]" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "destroy",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [{ name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "", type: "address" }],
      name: "users",
      outputs: [
        { name: "credited", type: "bool" },
        { name: "activeCredit", type: "address" },
        { name: "fraudStatus", type: "bool" },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "_borrower", type: "address" }],
      name: "setFraudStatus",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "requestedAmount", type: "uint256" },
        { name: "repaymentsCount", type: "uint256" },
        { name: "interest", type: "uint256" },
        { name: "creditDescription", type: "bytes32" },
      ],
      name: "applyForCredit",
      outputs: [{ name: "_credit", type: "address" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "_recipient", type: "address" }],
      name: "destroyAndSend",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_credit", type: "address" },
        { name: "state", type: "uint8" },
      ],
      name: "changeCreditState",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_address", type: "address" },
        { indexed: true, name: "_borrower", type: "address" },
        { indexed: true, name: "timestamp", type: "uint256" },
      ],
      name: "LogCreditCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_address", type: "address" },
        { indexed: true, name: "state", type: "uint8" },
        { indexed: true, name: "timestamp", type: "uint256" },
      ],
      name: "LogCreditStateChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_address", type: "address" },
        { indexed: true, name: "active", type: "bool" },
        { indexed: true, name: "timestamp", type: "uint256" },
      ],
      name: "LogCreditActiveChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_address", type: "address" },
        { indexed: false, name: "fraudStatus", type: "bool" },
        { indexed: false, name: "timestamp", type: "uint256" },
      ],
      name: "LogUserSetFraud",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_currentOwner", type: "address" },
        { indexed: true, name: "_newOwner", type: "address" },
      ],
      name: "LogOwnershipTransfered",
      type: "event",
    },
  ];

  let creditContractABI = [
    {
      constant: true,
      inputs: [],
      name: "getBalance",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "_state", type: "uint8" }],
      name: "changeState",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "", type: "address" }],
      name: "lenders",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "toggleActive",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "withdraw",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "repay",
      outputs: [],
      payable: true,
      stateMutability: "payable",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "revokeVote",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "refund",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "destroy",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [{ name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "fraudVote",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "invest",
      outputs: [],
      payable: true,
      stateMutability: "payable",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "requestInterest",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getCreditInfo",
      outputs: [
        { name: "", type: "address" },
        { name: "", type: "bytes32" },
        { name: "", type: "uint256" },
        { name: "", type: "uint256" },
        { name: "", type: "uint256" },
        { name: "", type: "uint256" },
        { name: "", type: "uint256" },
        { name: "", type: "uint256" },
        { name: "", type: "uint8" },
        { name: "", type: "bool" },
        { name: "", type: "uint256" },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "_recipient", type: "address" }],
      name: "destroyAndSend",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { name: "_requestedAmount", type: "uint256" },
        { name: "_requestedRepayments", type: "uint256" },
        { name: "_interest", type: "uint256" },
        { name: "_description", type: "bytes32" },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_address", type: "address" },
        { indexed: true, name: "timestamp", type: "uint256" },
      ],
      name: "LogCreditInitialized",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "state", type: "uint8" },
        { indexed: true, name: "timestamp", type: "uint256" },
      ],
      name: "LogCreditStateChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "active", type: "bool" },
        { indexed: true, name: "timestamp", type: "uint256" },
      ],
      name: "LogCreditStateActiveChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_address", type: "address" },
        { indexed: true, name: "_amount", type: "uint256" },
        { indexed: true, name: "timestamp", type: "uint256" },
      ],
      name: "LogBorrowerWithdrawal",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_address", type: "address" },
        { indexed: true, name: "_amount", type: "uint256" },
        { indexed: true, name: "timestamp", type: "uint256" },
      ],
      name: "LogBorrowerRepaymentInstallment",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_address", type: "address" },
        { indexed: true, name: "timestamp", type: "uint256" },
      ],
      name: "LogBorrowerRepaymentFinished",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_address", type: "address" },
        { indexed: true, name: "_amount", type: "uint256" },
        { indexed: true, name: "timestamp", type: "uint256" },
      ],
      name: "LogBorrowerChangeReturned",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_address", type: "address" },
        { indexed: true, name: "fraudStatus", type: "bool" },
        { indexed: true, name: "timestamp", type: "uint256" },
      ],
      name: "LogBorrowerIsFraud",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_address", type: "address" },
        { indexed: true, name: "_amount", type: "uint256" },
        { indexed: true, name: "timestamp", type: "uint256" },
      ],
      name: "LogLenderInvestment",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_address", type: "address" },
        { indexed: true, name: "_amount", type: "uint256" },
        { indexed: true, name: "timestamp", type: "uint256" },
      ],
      name: "LogLenderWithdrawal",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_address", type: "address" },
        { indexed: true, name: "_amount", type: "uint256" },
        { indexed: true, name: "timestamp", type: "uint256" },
      ],
      name: "LogLenderChangeReturned",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_address", type: "address" },
        { indexed: true, name: "timestamp", type: "uint256" },
      ],
      name: "LogLenderVoteForRevoking",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_address", type: "address" },
        { indexed: true, name: "timestamp", type: "uint256" },
      ],
      name: "LogLenderVoteForFraud",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_address", type: "address" },
        { indexed: true, name: "_amount", type: "uint256" },
        { indexed: true, name: "timestamp", type: "uint256" },
      ],
      name: "LogLenderRefunded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_currentOwner", type: "address" },
        { indexed: true, name: "_newOwner", type: "address" },
      ],
      name: "LogOwnershipTransfered",
      type: "event",
    },
  ];

  // Check if web3 is injected
  if (typeof window.ethereum !== "undefined") {
    // Modern DApp browsers
    web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.error("User denied account access");
    }
  } else if (typeof web3 !== "undefined") {
    // Legacy DApp browsers
    web3 = new Web3(web3.currentProvider);
  } else {
    // No web3 instance injected
    return showError(
      "Please install MetaMask to access the Ethereum Web3 API from your browser."
    );
  }

  let peerToPeerLendingContractInstance = new web3.eth.Contract(
    peerToPeerLendingContractABI,
    peerToPeerLendingContract
  );

  let creditStates = [
    "Investment",
    "Repayment",
    "Interest returns",
    "Expired",
    "Revoked",
    "Fraud",
  ];

  peerToPeerLendingContractInstance.methods
    .getCredits()
    .call()
    .then((result) => {
      console.log(result);

      result.forEach(function (index) {
        let creditAddress = index;
        let creditContract = new web3.eth.Contract(
          creditContractABI,
          creditAddress
        );

        creditContract.methods
          .getCreditInfo()
          .call()
          .then((info) => {
            let creditContractInfo = {
              address: creditAddress,
              borrower: info[0],
              description: web3.utils.toAscii(info[1]),
              requestedAmount: info[2].toString(),
              requestedRepayments: info[3].toString(),
              repaymentInstallment: info[4].toString(),
              remainingRepayments: info[5].toString(),
              interest: info[6].toString(),
              returnAmount: info[7].toString(),
              state: parseInt(info[8].toString()),
              active: info[9],
              balance: info[10].toString(),
            };

            $("#activeCredits").append(`
                            <div class="col-sm-6 mt-5">
                                <div class="card">
                                    <div class="card-header ${
                                      creditContractInfo.active
                                        ? "alert-success"
                                        : "alert-secondary"
                                    }">
                                        <h5 class="card-title">${
                                          creditContractInfo.description
                                        }</h5>
                                        <p>State: <span class="badge badge-primary">${
                                          creditStates[creditContractInfo.state]
                                        }</span></p>
                                    </div>
                                    <div class="card-body">
                                        <p class="card-text">
                                            <span class="credit-description-property">Address:</span> ${
                                              creditContractInfo.address
                                            }
                                        </p>
                                        <p class="card-text">
                                            <span class="credit-description-property">Borrower:</span> <a class="text-primary" href="/check?address=${
                                              creditContractInfo.borrower
                                            }" >${
              creditContractInfo.borrower
            }</a>
                                        </p>
                                        <p class="card-text">
                                            <span class="credit-description-property">Requested:</span> ${web3.utils.fromWei(
                                              creditContractInfo.requestedAmount,
                                              "ether"
                                            )} ETH
                                        </p>
                                        <p class="card-text">
                                            <span class="credit-description-property">Funded:</span> ${web3.utils.fromWei(
                                              creditContractInfo.balance,
                                              "ether"
                                            )} ETH
                                        </p>
                                        <p class="card-text">
                                            <span class="credit-description-property">Installments Count:</span> ${
                                              creditContractInfo.requestedRepayments
                                            }
                                        </p>
                                        <p class="card-text">
                                            <span class="credit-description-property">Interest:</span> ${web3.utils.fromWei(
                                              creditContractInfo.interest,
                                              "ether"
                                            )} ETH
                                        </p>
                                    </div>
                                </div>
                            </div>`);
          })
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log(err));

  function showError(errorMsg) {
    swal({
      type: "error",
      title: "Oops...",
      text: errorMsg,
    });
    console.log(errorMsg);
  }

  web3.eth.subscribe("newBlockHeaders", function (error, result) {
    if (!error) {
      web3.eth.getBlock(result.hash, function (error, block) {
        if (error) {
          console.log("Error fetching block:", error);
          return;
        }
        block.transactions.forEach(function (txHash) {
          web3.eth.getTransactionReceipt(txHash, function (error, receipt) {
            if (!error) {
              console.log(receipt);
            } else {
              console.log("Error fetching transaction receipt:", error);
            }
          });
        });
      });
    } else {
      console.log("Subscription error:", error);
    }
  });

  $("body").on("click", 'button[name="invest"]', function (e) {
    e.preventDefault();
    let address = $(this).attr("data-contract-address");
    let amountField = $(this).closest("div.investment-card").find("input");
    let amount = amountField.val();
    let selectedCreditContract = web3.eth
      .contract(creditContractABI)
      .at(address);
    let getData = selectedCreditContract.invest.getData();
    if (!address) {
      return showError("Invalid contract address.");
    }
    if (amount < 0 || amount == "" || amount == "undefined") {
      swal({
        type: "error",
        title: "Oops...",
        text: "Amount is missing!",
      });
      return;
    }

    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, invest!",
    }).then((result) => {
      if (result.value) {
        web3.eth.sendTransaction(
          {
            from: web3.eth.coinbase,
            to: address,
            data: getData,
            value: web3.toWei(amount, "ether"),
          },
          function (err, result) {
            if (err) {
              console.log(err);
              return;
            }

            swal("Invested!", "Your investment was sent.", "success");
            amountField.val("");
            console.log("tx.hash: " + result.transactionHash);
          }
        );
      }
    });
  });

  $("body").on("click", 'button[name="repayInstallment"]', function (e) {
    e.preventDefault();
    let address = $(this).attr("data-contract-address");
    let amountField = $(this).closest("div.investment-card").find("input");
    let amount = amountField.val();
    let selectedCreditContract = web3.eth
      .contract(creditContractABI)
      .at(address);
    let getData = selectedCreditContract.repay.getData();

    if (amount < 0 || amount == "" || amount == "undefined") {
      swal({
        type: "error",
        title: "Oops...",
        text: "Amount is missing!",
      });
      return;
    }

    web3.eth.sendTransaction(
      {
        from: web3.eth.coinbase,
        to: address,
        data: getData,
        value: web3.toWei(amount, "ether"),
      },
      function (err, result) {
        if (err) {
          console.log(err);
          return;
        }

        swal("Success!", "Your repayment was collected.", "success");
        amountField.val("");
        console.log("tx.hash: " + result.transactionHash);
      }
    );
  });

  $("body").on("click", 'button[name="requestInterest"]', function (e) {
    e.preventDefault();
    let address = $(this).attr("data-contract-address");

    console.log("requestInterest from " + address);

    let selectedCreditContract = web3.eth
      .contract(creditContractABI)
      .at(address);
    let getData = selectedCreditContract.requestInterest.getData();
    web3.eth.sendTransaction(
      { from: web3.eth.coinbase, to: address, data: getData },
      function (err, result) {
        if (err) {
          console.log(err);
          return;
        }

        console.log(result);
      }
    );
  });

  $("body").on("click", 'button[name="refund"]', function (e) {
    e.preventDefault();
    let address = $(this).attr("data-contract-address");

    console.log("refund request from " + address);

    let selectedCreditContract = web3.eth
      .contract(creditContractABI)
      .at(address);
    let getData = selectedCreditContract.refund.getData();
    web3.eth.sendTransaction(
      { from: web3.eth.coinbase, to: address, data: getData },
      function (err, result) {
        if (err) {
          console.log(err);
          return;
        }

        console.log(result);
      }
    );
  });

  $("body").on("click", 'button[name="revokeVote"]', function (e) {
    e.preventDefault();
    let address = $(this).attr("data-contract-address");

    console.log("revoke vote " + address);

    let selectedCreditContract = web3.eth
      .contract(creditContractABI)
      .at(address);
    let getData = selectedCreditContract.revokeVote.getData();
    web3.eth.sendTransaction(
      { from: web3.eth.coinbase, to: address, data: getData },
      function (err, result) {
        if (err) {
          console.log(err);
          return;
        }

        console.log(result);
      }
    );
  });

  $("body").on("click", 'button[name="fraudVote"]', function (e) {
    e.preventDefault();
    let address = $(this).attr("data-contract-address");
    let selectedCreditContract = web3.eth
      .contract(creditContractABI)
      .at(address);
    let getData = selectedCreditContract.fraudVote.getData();

    console.log("fraud vote " + address);

    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, vote!",
    }).then((result) => {
      if (result.value) {
        web3.eth.sendTransaction(
          { from: web3.eth.coinbase, to: address, data: getData },
          function (err, result) {
            if (err) {
              console.log(err);
              return;
            }

            swal("Voted!", "Your vote was saved.", "success");
            console.log(result);
          }
        );
      }
    });
  });

  $("body").on("click", 'button[name="withdraw"]', function (e) {
    e.preventDefault();
    let address = $(this).attr("data-contract-address");
    let selectedCreditContract = web3.eth
      .contract(creditContractABI)
      .at(address);
    let getData = selectedCreditContract.withdraw.getData();

    console.log("withdraw " + address);

    selectedCreditContract.withdraw(function (err, result) {
      if (err) {
        console.log(err);
        return;
      }

      swal("Success!", "Your account was credited.", "success");
      console.log(result);
    });
  });

  $("body").on("submit", "#borrowRequest", function (e) {
    e.preventDefault();

    let creditDescription = $(this)
      .find('input[name="creditDescription"]')
      .val();
    let creditRequestedAmount = $(this)
      .find('input[name="creditRequestedAmount"]')
      .val();
    let creditRequestedInstallmentsCount = $(this)
      .find('input[name="creditRequestedInstallmentsCount"]')
      .val();
    let creditRequestedInterest = $(this)
      .find('input[name="creditRequestedInterest"]')
      .val();

    peerToPeerLendingContractInstance.applyForCredit(
      web3.toWei(creditRequestedAmount, "ether").toString(10),
      creditRequestedInstallmentsCount,
      web3.toWei(creditRequestedInterest, "ether").toString(10),
      creditDescription,
      function (err, result) {
        if (err) {
          console.log(err);
          return showError("Smart contract call failed");
        }

        web3.eth.getTransactionReceipt(result, (err, result) => {
          if (err) {
            return showError("Smart contract call failed");
          }

          console.log(result);
          showInfo(`Credit successfully requested.`);
        });
      }
    );
  });

  if (top.location.pathname === "/lend") {
    console.log("lend");
  } else if (top.location.pathname === "/borrow") {
    peerToPeerLendingContractInstance.methods
      .users(web3.eth.defaultAccount)
      .call()
      .then((result) => {
        console.log(result);

        let user = {
          credited: result[0],
          lastCredit: result[1],
          fraudStatus: result[2],
        };

        if (user.credited === true) {
          $("#borrowContent").append(`
                        <div class="col-sm-8 offset-sm-2 alert-info">
                            <p>You cannot request another credit until you repay the last one!</p>
                        </div>
                    `);
        } else {
          $("#borrowContent").append(`
                        <form id="borrowRequest">
                            <h1 class="text-center">Borrow request</h1>
                            <div class="form-group">
                                <label for="creditDescription">Description</label>
                                <input type="text" class="form-control" name="creditDescription" placeholder="Why do you need the money?" required>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <label for="creditRequestedAmount">Requested Amount:</label>
                                    <input type="number" class="form-control" name="creditRequestedAmount" placeholder="e.g. 0.01 ETH" required>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="creditRequestedInstallmentsCount">Installments count:</label>
                                    <input type="number" class="form-control" name="creditRequestedInstallmentsCount" placeholder="e.g. 2" required>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="creditRequestedInterest">Interest:</label>
                                    <input type="number" class="form-control" name="creditRequestedInterest" placeholder="e.g. 2 ETH" required>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary btn-lg btn-block">Ask for funding</button>
                        </form>
                    `);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  } else if (top.location.pathname === "/profile") {
    console.log("profile");

    const userAddress = getUserAddress(); // Assuming this function fetches the user's address
    if (!web3.utils.isAddress(userAddress)) {
      console.error("Invalid user address:", userAddress);
      return; // Exit if the address is not valid
    }
    peerToPeerLendingContractInstance.methods
      .getUserCredits()
      .call({ from: userAddress })
      .then((result) => {
        console.log("User Credits:", result);

        if (result.length === 0) {
          $("#myCredits").append("<p>No credits found for this user.</p>");
          return; // Exit if there are no credits
        }

        result.forEach((creditAddress) => {
          if (!web3.utils.isAddress(creditAddress)) {
            console.error("Invalid credit address:", creditAddress);
            return; // Exit if the credit address is not valid
          }
          let creditContract = new web3.eth.Contract(
            creditContractABI,
            creditAddress
          );

          creditContract.methods
            .getCreditInfo()
            .call()
            .then((info) => {
              let creditContractInfo = {
                address: creditAddress,
                borrower: info[0],
                description: web3.utils.toAscii(info[1]),
                requestedAmount: info[2].toString(10),
                requestedRepayments: info[3].toString(10),
                repaymentInstallment: info[4].toString(10),
                remainingRepayments: info[5].toString(10),
                interest: info[6].toString(10),
                returnAmount: info[7].toString(10),
                state: parseInt(info[8].toString(10)),
                active: info[9],
                balance: info[10].toString(10),
              };

              $("#myCredits").append(`
                                <div class="col-sm-6 mt-5">
                                    <div class="card">
                                        <div class="card-header ${
                                          creditContractInfo.active
                                            ? "alert-success"
                                            : "alert-secondary"
                                        }">
                                            <h5 class="card-title">${
                                              creditContractInfo.description
                                            }</h5>
                                            <p>State: <span class="badge badge-primary">${
                                              creditStates[
                                                creditContractInfo.state
                                              ]
                                            }</span></p>
                                        </div>
                                        <div class="card-body">
                                            <p class="card-text">
                                                <span class="credit-description-property">Address:</span> ${
                                                  creditContractInfo.address
                                                }
                                            </p>
                                            <p class="card-text">
                                                <span class="credit-description-property">Requested:</span> ${web3.utils.fromWei(
                                                  creditContractInfo.requestedAmount,
                                                  "ether"
                                                )} ETH
                                            </p>
                                            <p class="card-text">
                                                <span class="credit-description-property">Funded:</span> ${web3.utils.fromWei(
                                                  creditContractInfo.balance,
                                                  "ether"
                                                )} ETH
                                            </p>
                                            <p class="card-text">
                                                <span class="credit-description-property">Installments Count:</span> ${
                                                  creditContractInfo.requestedRepayments
                                                }
                                            </p>
                                            <p class="card-text">
                                                <span class="credit-description-property">Interest:</span> ${web3.utils.fromWei(
                                                  creditContractInfo.interest,
                                                  "ether"
                                                )} ETH
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            `);
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  } else if (top.location.pathname === "/check") {
    let address = getUrlParameter("address");
    peerToPeerLendingContractInstance.methods
      .users(address)
      .call()
      .then((result) => {
        console.log(result);

        let user = {
          credited: result[0],
          lastCredit: result[1],
          fraudStatus: result[2],
        };

        $("#checkContent").append(`
                    <div class="col-sm-8 offset-sm-2 ${
                      user.fraudStatus ? "alert-danger" : "alert-success"
                    }">
                        <p>Credited: ${user.credited ? "Yes" : "No"} </p>
                        <p>Last credit: ${user.lastCredit} </p>
                        <p>Fraud status: ${
                          user.fraudStatus ? "Fraudulent" : "Good"
                        } </p>
                    </div>
                `);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Attach AJAX "loading" event listener
  $(document).on({
    ajaxStart: function () {
      $("#loadingBox").show();
    },
    ajaxStop: function () {
      $("#loadingBox").hide();
    },
  });

  function showSuccess(message) {
    swal({
      type: "success",
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  function showInfo(message) {
    swal("Info?", message, "question");
    console.log(message);
  }
  //
  function showError(errorMsg) {
    swal({
      type: "error",
      title: "Oops...",
      text: errorMsg,
    });
    console.log(errorMsg);
  }

  function getUrlParameter(sParam) {
    let sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split("&"),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("=");

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  }
});
