from selenium.webdriver.chrome.webdriver import WebDriver
import time

metamask_handle = None
METAMASK_PLUGIN_URL = 'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#'
AccountXpath = '//div[@class="account-menu__icon"]'
AccountListXpath = '//div[@class="account-menu__accounts"]'
PublicAddressXpath = '//div[@class="selected-account__address"]'
CreateAccountXpath = '//div[@class="account-menu"]/div[6]'
AccountNameXpath = '//input[@class="new-account-create-form__input"]'
CreateButtonXpath = '//div[@class="new-account-create-form__buttons"]/button[2]'


def _create_new_handle(driver: WebDriver, url: str):
    handles = driver.window_handles.copy()
    currentHandle = driver.current_window_handle
    js = " window.open('%s')" % url
    driver.execute_script(js)
    targetHandle = None
    newHandles = driver.window_handles
    for handle in newHandles:
        if handle not in handles:
            targetHandle = handle
            break
    driver.switch_to.window(targetHandle)
    driver.get(METAMASK_PLUGIN_URL)
    driver.switch_to.window(currentHandle)
    return targetHandle


def _wait_icon_enable(driver: WebDriver, iconXpath: str):
    for _ in range(5):
        try:
            driver.find_element_by_xpath(iconXpath)
            break
        except Exception as e:
            time.sleep(3)


def switch_to_account(driver: WebDriver, accountIndices: int):
    global metamask_handle
    if metamask_handle is None:
        metamask_handle = _create_new_handle(driver, METAMASK_PLUGIN_URL)
        assert metamask_handle is not None
    currentHandle = driver.current_window_handle
    driver.switch_to.window(metamask_handle)
    assert driver.current_url == METAMASK_PLUGIN_URL
    _wait_icon_enable(driver, AccountXpath)
    driver.find_element_by_xpath(AccountXpath).click()
    detailAccountXpath = AccountListXpath + '/div[' + str(accountIndices) + ']'
    try:
        driver.find_element_by_xpath(detailAccountXpath).click()
        publicAddress = driver.find_element_by_xpath(PublicAddressXpath).text
    except Exception as e:
        print(e)
        return None
    driver.switch_to.window(currentHandle)
    return publicAddress


def collect_account(driver: WebDriver, accountCount: int):
    global metamask_handle
    if metamask_handle is None:
        metamask_handle = _create_new_handle(driver, METAMASK_PLUGIN_URL)
        assert metamask_handle is not None
    currentHandle = driver.current_window_handle
    AccountName = []
    driver.switch_to.window(metamask_handle)
    _wait_icon_enable(driver, AccountXpath)
    for _ in range(accountCount):
        driver.find_element_by_xpath(AccountXpath).click()
        driver.find_element_by_xpath(CreateAccountXpath).click()
        AccountName.append(driver.find_element_by_xpath(AccountNameXpath).get_attribute('placeholder'))
        driver.find_element_by_xpath(CreateButtonXpath).click()
    driver.switch_to.window(currentHandle)
    return AccountName
