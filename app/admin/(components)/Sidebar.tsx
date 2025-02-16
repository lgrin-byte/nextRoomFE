import React, { useEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import HintDialog from "@/components/common/Dialog-new/Hint-Dialog-new/Dialog";
import {
  logoProps,
  plusDisableProps,
  plusProps,
  subscribeLinkURL,
} from "@/admin/(consts)/sidebar";
import {
  getLoginInfo,
  getSelectedThemeId,
  getStatus,
  removeAccessToken,
  removeThemeId,
} from "@/utils/storageUtil";
import { useSelectedThemeReset } from "@/components/atoms/selectedTheme.atom";
import { useDrawerState } from "@/components/atoms/drawer.atom";
import useModal from "@/hooks/useModal";
import { QUERY_KEY } from "@/queries/getThemeList";

interface Theme {
  id: number;
  title: string;
  timeLimit: number;
  hintLimit: number;
}

interface Props {
  categories: Theme[];
  selectedTheme: Theme;
  handleClickSelected: (theme: Theme) => void;
}

export default function Sidebar(props: Props) {
  const router = useRouter();
  const resetSelectedTheme = useSelectedThemeReset();
  const queryClient = useQueryClient();

  const [drawer, setDrawer] = useDrawerState();
  const { open } = useModal();

  const status = getStatus();
  const searchParams = useSearchParams();
  const selectedThemeId = getSelectedThemeId();
  const params = new URLSearchParams(searchParams.toString()).toString();
  const { categories, handleClickSelected } = props;
  const [loginInfo, setLoginInfo] = useState({
    adminCode: "",
    shopName: "",
  });

  useEffect(() => {
    const { adminCode, shopName } = getLoginInfo(); // getLoginInfo로 값 가져오기
    setLoginInfo({ adminCode, shopName }); // 상태 업데이트
  }, []);

  const handleLogout = () => {
    removeAccessToken();
    resetSelectedTheme();
    setLoginInfo({
      adminCode: "",
      shopName: "",
    });
    // router.push("/login");
    window.location.href = "/login";
  };
  useEffect(() => {
    if (selectedThemeId && selectedThemeId !== "0")
      router.push(
        `/admin?themeId=${encodeURIComponent(selectedThemeId)}
      `
      );
  }, [selectedThemeId, params]);

  const navigateToNewTheme = () => {
    resetSelectedTheme();
    router.push("/admin");
    setDrawer({ ...drawer, isOpen: false });
  };
  const handleSelectTheme = async (theme: Theme) => {
    if (drawer.isOpen && !drawer.isSameHint) {
      open(HintDialog, {
        type: "put",
        fn: () => {
          handleClickSelected(theme);
          setDrawer({ ...drawer, isOpen: false });
        },
      });
    } else {
      setDrawer({ ...drawer, isOpen: false });
      await queryClient.invalidateQueries(QUERY_KEY);
      handleClickSelected(theme);
    }
  };

  const handleCreateTheme = () => {
    if (drawer.isOpen && !drawer.isSameHint) {
      open(HintDialog, { type: "put", fn: navigateToNewTheme });
    } else {
      removeThemeId();
      setDrawer({ ...drawer, isOpen: false });
      navigateToNewTheme();
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <div className="sidebar__shop-info">
          <div className="sidebar__shop-info-img-box">
            <Image {...logoProps} className="sidebar__shop-logo" />
            <div />
            <button
              className="sidebar__shop-info-logout-btn"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
          <span className="sidebar__shop-name">
            {loginInfo.shopName?.replaceAll(`"`, "")}
          </span>
        </div>
        <div className="sidebar__theme-title">우리 지점 테마</div>
      </div>
      <div className="sidebar__scroll">
        <ul className="sidebar__theme-list">
          {[...categories].reverse().map((theme) => (
            <li
              className="sidebar__theme-item"
              key={theme.id}
              title={theme.title}
            >
              <button
                type="button"
                className={classNames("sidebar__theme-button", {
                  selected: selectedThemeId === theme.id.toString(),
                })}
                onClick={() => handleSelectTheme(theme)}
              >
                {theme.title}
              </button>
            </li>
          ))}
          <li className="sidebar__theme-item">
            <button
              type="button"
              className={classNames(
                "sidebar__theme-button sidebar__add-theme",
                {
                  selected: !params,
                }
              )}
              onClick={handleCreateTheme}
            >
              <Image {...(params ? plusDisableProps : plusProps)} />새 테마
              추가하기
            </button>
          </li>
        </ul>
        {!(status?.replaceAll(`"`, "") === "SUBSCRIPTION") && (
          <div className="sidebar__subscribe">
            <p className="sidebar__subscribe-title">
              구독하고 힌트에 사진을 추가해 보세요
            </p>
            <p className="sidebar__subscribe-value">
              사진을 추가하려면 유료 구독이 필요해요
            </p>
            <button
              type="button"
              className="sidebar__subscribe-button button32"
              onClick={() => {
                window.open(subscribeLinkURL, "_blank", "noopener, noreferrer");
              }}
            >
              구독 알아보기
            </button>
          </div>
        )}
      </div>

      <div className="sidebar__bottom">
        <p className="sidebar__admin-code-title">관리자 코드</p>
        <p className="sidebar__admin-code-value">
          {loginInfo.adminCode?.replaceAll(`"`, "")}
        </p>
      </div>
    </div>
  );
}
