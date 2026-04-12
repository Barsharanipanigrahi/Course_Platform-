const Order = require("../model/Order");
const Enrollment = require("../model/Enrollment");
const Courses = require("../model/Courses");

// POST /api/order/create
const createOrder = async (req, res) => {
  try {
    const { courseId, paymentType } = req.body;
    const userId = req.user._id;

    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ status: false, message: "Course not found" });
    }

    const originalPrice = course.price || 0;

    // Free course — just enroll directly
    if (originalPrice === 0) {
      const alreadyEnrolled = await Enrollment.findOne({ user: userId, course: courseId });
      if (alreadyEnrolled) {
        return res.json({ status: false, message: "Already enrolled in this course" });
      }
      await Enrollment.create({ user: userId, course: courseId });
      return res.json({ status: true, message: "Enrolled successfully (Free Course)" });
    }

    // Check existing order
    const existingOrder = await Order.findOne({ user: userId, course: courseId });
    if (existingOrder) {
      return res.json({ status: false, message: "You have already purchased this course" });
    }

    let amountPaid = 0;
    let totalAmount = 0;
    let discountApplied = 0;
    let remainingAmount = 0;
    let installments = [];
    let orderStatus = "pending";

    if (paymentType === "full") {
      // 10% discount on full payment
      discountApplied = 10;
      totalAmount = Math.round(originalPrice * 0.9);
      amountPaid = totalAmount;
      remainingAmount = 0;
      orderStatus = "completed";
    } else {
      // Installment: 3 equal parts, no discount
      totalAmount = originalPrice;
      const installmentAmount = Math.round(originalPrice / 3);
      amountPaid = installmentAmount; // first installment paid now
      remainingAmount = totalAmount - amountPaid;
      orderStatus = "partial";

      const now = new Date();
      installments = [
        {
          installmentNumber: 1,
          amount: installmentAmount,
          dueDate: now,
          paid: true,
          paidAt: now,
        },
        {
          installmentNumber: 2,
          amount: installmentAmount,
          dueDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // +30 days
          paid: false,
        },
        {
          installmentNumber: 3,
          amount: originalPrice - installmentAmount * 2,
          dueDate: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000), // +60 days
          paid: false,
        },
      ];
    }

    const order = await Order.create({
      user: userId,
      course: courseId,
      paymentType,
      originalPrice,
      discountApplied,
      amountPaid,
      totalAmount,
      remainingAmount,
      installments,
      status: orderStatus,
    });

    // Auto-enroll after payment
    const alreadyEnrolled = await Enrollment.findOne({ user: userId, course: courseId });
    if (!alreadyEnrolled) {
      await Enrollment.create({ user: userId, course: courseId });
    }

    return res.json({
      status: true,
      message:
        paymentType === "full"
          ? `Payment successful! You saved ₹${originalPrice - totalAmount} with 10% discount.`
          : `First installment of ₹${amountPaid} paid. 2 more installments remaining.`,
      order,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, message: "Order creation failed" });
  }
};

// GET /api/order/my-orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("course");
    return res.json({ status: true, orders });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, message: "Failed to fetch orders" });
  }
};

// GET /api/order/all  (admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("course", "title price")
      .populate("user", "name email");
    return res.json({ status: true, orders });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, message: "Failed to fetch orders" });
  }
};

module.exports = { createOrder, getMyOrders, getAllOrders };