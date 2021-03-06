import React, { useState, useEffect } from "react";
import FormInput from "../../components/Form-input/form-input.component";
import CreateShopBtn from "../../components/CustomButton/CustomButton";
import {
  getAvailableDispatchRider,
  getCurrencyType,
  createShop,
  getPaymentRef,
} from "../../Services/CreateShoputil";

import PayWithRaveBtn from "../../components/RaveGateway/PayWithRaveBtn";
import "./createShop.css";

const CreateShop = (props) => {
  //   const history = useHistory();
  const [shop, setShop] = useState({
    storeName: "",
    currencyId: " ",
    description: "",
    dispatchRiderId: "",
  });
  const [errors, setError] = useState({});
  const [dispatchRiderId, setdispatchRiderId] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [shopcreated, setShopcreated] = useState({});
  const [res, setRes] = useState({});
  const [loading, setLoading] = useState(false);
  const [payRef, setPayRef] = useState({});
  const [riderAvailable, setAvailable] = useState(true);

  useEffect(() => {
    getCurrencyType(setCurrency);

    //eslint - disable - next - line;
  }, []);

  const validateForm = (props) => {
    // let formField = user.formField;
    let errors = {};
    let formIsValid = true;

    if (!shop.storeName) {
      formIsValid = false;
      errors["storeName"] = "Please provide a unique Store";
    }
    if (!shop.dispatchRiderId) {
      formIsValid = false;
      errors["dispatchRiderId"] = "Assign dispatch Rider to shop";
    }
    if (!shop.currencyId) {
      formIsValid = false;
      errors["currencyId"] = "select currency type";
    }
    if (!shop.description) {
      formIsValid = false;
      errors["description"] = "Provide some details about your shop";
    }
    setError(errors);
    return formIsValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(!loading);
      createShop(setRes, shop);
    }
    if (res.message === "200") {
      await getPaymentRef(setPayRef);
    }
    console.log("see mrere");
  };

  const onChanges = (e) => {
    setShop({
      ...shop,
      [e.target.name]: e.target.value,
    });
    setShopcreated({ [e.target.name]: e.target.value });
    console.log(shopcreated);
    if (e.target.name === "shopId") {
      getPaymentRef(setPayRef, e.target.value);
    }

    // console.log(shop);
    if (e.target.name === "currencyId") {
      setAvailable(false);
      getAvailableDispatchRider(setdispatchRiderId, e.target.value);
    }
  };

  return (
    <div className="container">
      <div className="shop-form">
        <h3 className="mb-2">
          Pitch your tent on Tenancy-
          <span style={{ color: "goldenrod" }}>Hub</span> to grow incomes
        </h3>
        <form onSubmit={onSubmit}>
          {/* <div className="formGroup"> */}
          <label htmlFor="bank-detail">Shop Name</label>
          <span
            className="d-block"
            style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
          >
            {errors["storeName"]}
          </span>
          <FormInput
            type="text"
            name="storeName"
            // value={email}
            placeholder="Enter Shop name"
            onChange={onChanges}
            required
          />
          <div>
            <label htmlFor="store description">Description</label>
            <span
              className="d-block"
              style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
            >
              {errors["description"]}
            </span>
            <textarea
              className="group"
              name="description"
              //   value={description}
              onChange={onChanges}
              placeholder="Brief Store details"
              //   style={{ width: "100%" }}
              rows="3"
            ></textarea>
          </div>
          <label htmlFor="currency type">Currency type</label>

          <span
            className="d-block"
            style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
          >
            {errors["currencyId"]}
          </span>
          <select
            value={shop.currencyId}
            onChange={onChanges}
            name="currencyId"
          >
            <option value="SELECT CURRENCY TYPE">SELECT CURRENCY TYPE</option>
            {currency.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <label htmlFor="currency type">Dispatch Ride</label>

          <span
            className="d-block"
            style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
          >
            {errors["dispatchRiderId"]}
          </span>
          <select
            value={shop.dispatchRiderId}
            onChange={onChanges}
            name="dispatchRiderId"
            disabled={riderAvailable}
          >
            <option value="SELECT DISPATCH RIDER">SELECT DISPATCH RIDER</option>
            {dispatchRiderId.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>

          <span
            className="text-center"
            style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
          >
            {" "}
            {res.message}
          </span>
          {res.message !== "200" && (
            // <FormInput
            //   onClick={onSubmit}
            //   style={{ width: "100%", color: "black", background: "grey" }}
            //   type="submit"
            //   value="Create Shop"
            // />
            <div className="mt-3">
              <CreateShopBtn
                onClick={onSubmit}
                type="submit"
                style={{ width: "100%" }}
              >
                {loading && <i class="spinner-border spinner-border-sm"></i>}
                Create Shop
              </CreateShopBtn>
            </div>
          )}
          {/* {res.message === "200" && ( */}

          {/* // )} */}
        </form>

        {props.shopAvailable.length > 0 && (
          <>
            <div className=" mt-4 py-3">
              <div htmlFor="available shop" className="text-center">
                <h5> Select Shop to pay</h5>
              </div>
              <select
                value={shopcreated.shopId}
                onChange={onChanges}
                name="shopId"
                //   {!riderAvailable ? disabled: null}
              >
                <option value="SELECT DISPATCH RIDER">SELECT SHOP</option>
                {props.shopAvailable.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.storeName}
                  </option>
                ))}
              </select>
              <PayWithRaveBtn
                // class="button"
                // btnText="Pay Now to verify shop"
                tx_ref={payRef.paymentReference}
                currency={payRef.currency}
                amount={payRef.amount}
                name={shop.storeName}
                phoneNumber=""
                email={localStorage.getItem("email")}
                storeName={`Payment for ${shop.storeName} Shop`}
                // callback={onSuccess}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
// const mapStateToProps = (state) => ({
//   authState: state.Auth.isAuthenticated,
// });

export default CreateShop;
// export default connect(mapStateToProps, { login })(Login);
