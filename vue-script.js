let app2 = new Vue({
  el: "#app-vue",
  data: {
    subTotalPrice: "0.00",
    discountPrice: "0 %",
    totalPrice: "0.00",
  },
  methods: {
    calculateSale: function (calculate_err_msg) {
      let productPrice = document.querySelectorAll(".product-price");
      let productAmount = document.querySelectorAll(".product-amount");
      let currencyCode = document.getElementById("currency-code").value;
      let productTaxPrice = 0;
      let discountPrice = 0;

      this.discountPrice = `${discountPrice} %`;

      if (
        parseInt(this.$refs.orange.value) > 1 ||
        parseInt(this.$refs.pink.value) > 1 ||
        parseInt(this.$refs.green.value) > 1
      ) {
        discountPrice = 5;
        this.discountPrice = `- ${discountPrice} %`;
      }

      if (this.$refs.memberCard.checked) {
        discountPrice = 10;
        this.discountPrice = `- ${discountPrice} %`;
      }

      let priceWithQuantity = 0;
      let sumSubTotalPrice = 0;

      if (productPrice[0] && productPrice[0].value) {
        productPrice.forEach(function (val, index) {
          priceWithQuantity =
            parseInt(val.value) * parseInt(productAmount[index].value);
          sumSubTotalPrice += parseInt(priceWithQuantity);
        });

        this.subTotalPrice = this.convertCurrency(
          sumSubTotalPrice,
          currencyCode
        );

        // With discount + vat
        let priceDiscount = (parseInt(sumSubTotalPrice) * discountPrice) / 100;
        let totalPriceSum = parseInt(sumSubTotalPrice) - priceDiscount;
        let price_vat = (totalPriceSum * productTaxPrice) / 100;
        let totalPriceSumVat = totalPriceSum + price_vat;

        this.totalPrice = this.convertCurrency(totalPriceSumVat, currencyCode);
      } else {
        alert(calculate_err_msg);
      }
    },
    convertCurrency: function (amount, currencyCode) {
      if (currencyCode === "THB") {
        let formatter = new Intl.NumberFormat("th-TH", {
          style: "currency",
          currency: "THB",
          minimumFractionDigits: 2,
        });
        return formatter.format(amount);
      } else if (currencyCode === "ILS") {
        let formatter = new Intl.NumberFormat("il-IL", {
          style: "currency",
          currency: "ILS",
          minimumFractionDigits: 2,
        });
        return formatter.format(amount);
      } else {
        let formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        });
        return formatter.format(amount);
      }
    },
  },
});
