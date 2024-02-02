var alertCallback, confirmCallback_agree, confirmCallback_cancel;
var uploadPathInfo;

var modal_alert = function (title, content, callback) {
  alertCallback = "";
  alertCallback = callback;
  $("#modal-alert-title").html(title);
  $("#modal-alert-content").html(content);
  $("#modal-alert").modal();
};

var modal_confirm = function (title, content, callback_true, callback_false) {
  confirmCallback_agree = "";
  confirmCallback_cancel = "";
  confirmCallback_agree = callback_true;
  confirmCallback_cancel = callback_false;
  $("#modal-confirm-title").html(title);
  $("#modal-confirm-content").html(content);
  $("#modal-confirm").modal();
};

function modal_hide() {
  $(".modal").modal("hide");
}
// modal

$(function () {
  $(".btn-cancel").on("click", function () {
    history.go(-1);
  });
  // back

  $("input[type=file]").change(function (e) {
    $(this).parent().find(".custom-file-label").text(e.target.files[0].name);
  });
  // filename

  $("#btn_logout").on("click", function () {
    location.href = "./index.html";
  });
  // logout

  if ($(".list_img").length > 0) {
    var listImg = new Swiper(".list_img", {
      slidesPerView: 5.4,
      spaceBetween: 20,
      speed: 600,
      breakpoints: {
        1920: { slidesPerView: 5.4 },
        1300: { slidesPerView: 4.4 },
        1025: { slidesPerView: 3.4 },
        641: { slidesPerView: 2.4 },
        320: { slidesPerView: 1.4 },
      },
    });
  }
  // image

  $("#partnerList").select2();
  // select

  $("#sort_part").on("click", function () {
    if ($(this).is(":checked")) {
      $("#sort_partLabel").text("평가순");
      partner_list.sort(function compare(a, b) {
        return parseFloat(b.eval) - parseFloat(a.eval);
      });
    } else {
      $("#sort_partLabel").text("횟수순");
      partner_list.sort(function compare(a, b) {
        return parseFloat(b.cnt) - parseFloat(a.cnt);
      });
    }
    setPartnerSelect();
  });

  $("#searchInit").on("click", function () {
    $("#sizeList option").eq(0).prop("selected", "selected");
    $("#priceList option").eq(0).prop("selected", "selected");
    $("#sortSorting option").eq(0).prop("selected", "selected");
    $("#sortLocation option").eq(0).prop("selected", "selected");
    $("#sDate").val("");
    $("#eDate").val("");
    $("#sort_part").prop("checked", false);
    $("#partnerList").val("").select2();
    $("#sch_keyword").val("");
  });
  // filter

  $(document).on("click", ".show_docs_estimate", function () {
    $(".modal_estimate").modal();
  });

  $(document).on("click", ".show_docs_plan", function () {
    $(".modal_plan").modal();
  });

  $(document).on("click", ".show_docs_table", function () {
    $(".modal_table").modal();
  });

  $(document).on("click", ".show_eval_gallery", function () {
    $(".modal_eval_gallery").modal();
  });

  $(document).on("click", ".show_history_gallery", function () {
    $(".modal_history_gallery").modal();
  });

  $(document).on("click", ".show_docs_inquiry", function () {
    $(".modal_inquiry").modal();
  });

  $(document).on("click", ".show_add_price", function () {
    $(".modal_price").modal();
  });

  $(document).on("click", ".show_docs_company", function () {
    $(".modal_company").modal();
  });

  $(document).on("click", ".show_docs_contract", function () {
    $(".modal_contract").modal();
  });

  $(document).on("click", ".show_contract_form", function () {
    $(".modal_contract_form").modal();
  });

  $(document).on("click", ".show_partner_record", function () {
    $(".modal_partner").modal();
  });

  $(document).on("click", ".show_ctrl_account", function () {
    $(".modal_account").modal();
  });

  $(document).on("click", ".show_bidding_form", function () {
    $(".modal_bidding").modal();
  });

  $(document).on("click", ".show_contract_memo", function () {
    $(".modal_memo").modal();
  });

  $(document).on("click", ".show_docs_bidd_list", function () {
    $(".modal_bidd_docs").modal();
  });

  $(document).on("click", ".show_record_list", function () {
    $(".modal_record").modal();
  });

  // modal

  $(".textarea_count_limit").on("keyup", function () {
    var customerWrite = $(this).val();
    $(".textarea_count_screen").text(customerWrite.length + " / 300");
    if (customerWrite.length > 300) {
      return false;
    }
  });
  // count

  $("#btn_brand_add").on("click", function () {
    var addBrand = `
      <div class="brand_add brand_list_arr">
        <input type="text" class="form-control frm_comp form-valid fv-empty brand_list_mod" title="브랜드명" placeholder="브랜드명을 입력해 주세요." data-bran-idx="" value="" />
        <button type="button" class="btn_add btn_brand_del" data-bran-idx="">
          <i class="fa-solid fa-square-minus"></i>
        </button>
      </div>
    `;
    $("#brand_list").append(addBrand);
  });

  $(document).on("click", ".company_form .btn_brand_del", function () {
    if ($(".brand_list_arr").length == 1) {
      modal_alert(
        "프랜차이즈 법인 회원가입",
        "최소 1개 이상의 브랜드가 필요합니다.",
        function () {
          modal_hide();
        }
      );
    } else {
      $(this).parent().remove();
    }
  });

  $(document).on("click", ".company_form .comp-submit", function () {
    modal_alert(
      "프랜차이즈 법인 회원가입",
      "회원가입이 완료되었습니다.",
      function () {
        modal_hide();
      },
      $("#modal-alert-agree").on("click", function () {
        history.go(-1);
      })
    );
  });

  $(document).on("click", ".partner_form .comp-submit", function () {
    modal_alert(
      "시공사 회원가입",
      "회원가입이 완료되었습니다.",
      function () {
        modal_hide();
      },
      $("#modal-alert-agree").on("click", function () {
        history.go(-1);
      })
    );
  });
  // join

  $(".list_title").on("click", function () {
    $(this).siblings(".list_detail").toggleClass("active");
  });
  // store

  $(document).on("click", ".eval-his-submit", function () {
    modal_alert(
      "시공 평가",
      "저장되었습니다.",
      function () {
        modal_hide();
      },
      $("#modal-alert-agree").on("click", function () {
        location.href = "./index.html";
      })
    );
  });
  // store_eval

  $(document).on("click", ".his-submit", function () {
    modal_alert(
      "시공 일지",
      "저장되었습니다.",
      function () {
        modal_hide();
      },
      $("#modal-alert-agree").on("click", function () {
        history.go(-1);
      })
    );
  });

  $(document).on("click", ".modal_inquiry .bidd-submit", function () {
    modal_alert("비딩", "입찰되었습니다.", function () {
      modal_hide();
      location.reload();
    });
  });
  // inquiry

  $(document).on("click", "#modal-price-agree", function () {
    modal_alert("추가 금액", "저장되었습니다.", function () {
      modal_hide();
      location.reload();
    });
  });
  // admin

  $(document).on("click", ".acc_status_update", function () {
    modal_alert("계정 관리", "승인되었습니다.", function () {
      modal_hide();
      location.reload();
    });
  });
  // accout

  $(document).on("click", ".add_contract_form", function () {
    modal_alert(
      "계약 등록",
      "계약이 등록되었습니다. </br> 다음 아이디를 가맹점주님에게 알려주십시오. <br /> ID : company.1 <br /> PW : 000000",
      function () {
        modal_hide();
        location.reload();
      }
    );
  });
  // admin_contract

  $(document).on("click", "#btn_bidd_add", function () {
    modal_alert("공사의뢰", "저장되었습니다.", function () {
      modal_hide();
      location.reload();
    });
  });

  $(document).on("click", "#btn_bidd_memo_save", function () {
    modal_alert("진행과정", "저장되었습니다.", function () {
      modal_hide();
      location.reload();
    });
  });

  $(document).on("click", ".select_partner", function () {
    modal_alert(
      "시공사 비딩",
      "업체 선정이 완료되었습니다. <br /> 시공계약에서 확인해주세요. .",
      function () {
        modal_hide();
        location.reload();
      }
    );
  });

  $(".btn_part_list_div_open").on("click", function () {
    $(this)
      .parents(".list_detail")
      .next(".part_list_for_bidd_div")
      .toggleClass("active");
  });

  $(document).on("click", ".btn_select_part_submit", function () {
    modal_alert(
      "시공사 비딩",
      "비딩에 참여할 시공사 선택이 저장되었습니다.",
      function () {
        modal_hide();
        location.reload();
      }
    );
  });
  // admin_bidding

  $(document).on("click", ".acc_change_pw", function () {
    modal_alert("계정 관리", "저장되었습니다.", function () {
      modal_hide();
      location.reload();
    });
  });

  // admin_company
});
